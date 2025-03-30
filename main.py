from fastapi import FastAPI, HTTPException, UploadFile, File
import joblib
import os
import pandas as pd
import numpy as np
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, log_loss
from sklearn.preprocessing import LabelEncoder

# Initialize FastAPI app and load environment variables
app = FastAPI()
load_dotenv()

# Load trained model
MODEL_PATH = "models/rf_aq_model.pkl"

def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    raise HTTPException(status_code=500, detail="Model file not found.")

# Connect to MongoDB (Atlas)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["air_quality_test"]
collection = db["retrain_data"]

# Define request model for prediction
class PredictionRequest(BaseModel):
    temperature: float
    humidity: float
    pm10: float
    no2: float
    so2: float
    co: float
    proximity_to_industrial_areas: float
    population_density: float

# Predict endpoint
@app.post("/predict")
def predict(data: PredictionRequest):
    model = load_model()
    input_data = pd.DataFrame([data.model_dump()], dtype=float)
    input_data.rename(columns={
        "pm10": "PM10",
        "no2": "NO2",
        "so2": "SO2",
        "co": "CO",
        "humidity": "Humidity",
        "temperature": "Temperature",
        "proximity_to_industrial_areas": "Proximity_to_Industrial_Areas",
        "population_density": "Population_Density"
    }, inplace=True)
    prediction = model.predict(input_data)
    return {"Air Quality": prediction[0]}

# Retrain model endpoint
@app.post("/retrain")
def retrain():
    try:
        new_data = list(collection.find({}, {"_id": 0}))
        if not new_data:
            return {"message": "No new data available for retraining."}

        df = pd.DataFrame(new_data)
        df.rename(columns={
            "pm10": "PM10",
            "no2": "NO2",
            "so2": "SO2",
            "co": "CO",
            "humidity": "Humidity",
            "temperature": "Temperature",
            "proximity_to_industrial_areas": "Proximity_to_Industrial_Areas",
            "population_density": "Population_Density"
        }, inplace=True)

        if "Air Quality" not in df.columns:
            raise HTTPException(status_code=500, detail="'Air Quality' column missing from dataset.")
        
        X = df.drop(columns=["Air Quality"], errors='ignore')
        y = df["Air Quality"].astype(str)

        new_model = RandomForestClassifier(
            max_depth=10,
            max_features="log2",
            min_samples_leaf=1,
            min_samples_split=2,
            n_estimators=200,
            random_state=42
        )
        new_model.fit(X, y)
        joblib.dump(new_model, MODEL_PATH)
        return {"message": "Model retrained successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Data summary endpoint
@app.get("/data_summary")
def data_summary():
    try:
        # Fetch some summary information from the collection
        eval_data = list(collection.find({}, {"_id": 0}))
        if not eval_data:
            return {"message": "No data available."}

        df = pd.DataFrame(eval_data)
        num_records = len(df)
        unique_levels = df["Air Quality"].unique()

        # Provide a brief summary of the dataset
        summary = {
            "total_records": num_records,
            "unique_air_quality_levels": unique_levels.tolist(),
            "recent_readings": df.tail(5).to_dict(orient='records')  # Last 5 entries as a preview
        }

        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Upload CSV data to MongoDB endpoint
@app.post("/upload")
def upload(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        df.rename(columns={
            "pm10": "PM10",
            "no2": "NO2",
            "so2": "SO2",
            "co": "CO",
            "humidity": "Humidity",
            "temperature": "Temperature",
            "proximity_to_industrial_areas": "Proximity_to_Industrial_Areas",
            "population_density": "Population_Density"
        }, inplace=True)
        collection.insert_many(df.to_dict(orient="records"))
        return {"message": "Data uploaded successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
