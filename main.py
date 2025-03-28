from fastapi import FastAPI, HTTPException, File, UploadFile
import joblib
import os
import shutil
import pandas as pd
import numpy as np
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv

# Initialize FastAPI app and load environment variables
app = FastAPI()
load_dotenv()

# Load trained model
MODEL_PATH = "models/best_rf_model.pkl"
def load_model():
    if not os.path.exists(MODEL_PATH):
        raise HTTPException(status_code=500, detail="Model file not found.")
    return joblib.load(MODEL_PATH)

# Connect to MongoDB (Atlas)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["air_quality_test"]
collection = db["retrain_data"]

# Create directory for uploads if it doesn't exist
UPLOAD_DIR = "data"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Define request model for prediction
class PredictionRequest(BaseModel):
    temperature: float
    humidity: float
    pm2_5: float
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
        "pm2_5": "PM2.5",
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
    return {"Air Quality": int(prediction[0])}

# Upload data endpoint
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Read CSV into Pandas DataFrame
        df = pd.read_csv(file_path)

        # Standardize column names to match model input
        df.rename(columns={
            "pm2_5": "PM2.5",
            "pm10": "PM10",
            "no2": "NO2",
            "so2": "SO2",
            "co": "CO",
            "humidity": "Humidity",
            "temperature": "Temperature",
            "proximity_to_industrial_areas": "Proximity_to_Industrial_Areas",
            "population_density": "Population_Density"
        }, inplace=True)

        # Ensure column consistency
        required_columns = [
            "Temperature", "Humidity", "PM2.5", "PM10", "NO2", "SO2", "CO",
            "Proximity_to_Industrial_Areas", "Population_Density", "Air Quality"
        ]
        for col in required_columns:
            if col not in df.columns:
                raise HTTPException(status_code=400, detail=f"Missing column: {col}")

        # Convert DataFrame to JSON and insert into MongoDB
        collection.insert_many(df.to_dict(orient="records"))

        return {"message": "File uploaded and data inserted successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Retrain model endpoint
@app.post("/retrain")
def retrain():
    try:
        # Fetch new training data from MongoDB
        new_data = list(collection.find({}, {"_id": 0}))  # Exclude `_id` field
        if not new_data:
            return {"message": "No new data available for retraining."}

        # Convert to DataFrame
        df = pd.DataFrame(new_data)

        # Print column names to debug missing "Air Quality"
        print("Columns in DataFrame:", df.columns)

        # Rename columns to match model training
        df.rename(columns={
            "pm2_5": "PM2.5",
            "pm10": "PM10",
            "no2": "NO2",
            "so2": "SO2",
            "co": "CO",
            "humidity": "Humidity",
            "temperature": "Temperature",
            "proximity_to_industrial_areas": "Proximity_to_Industrial_Areas",
            "population_density": "Population_Density"
        }, inplace=True)

        # Ensure "Air Quality" exists
        if "Air Quality" not in df.columns:
            return {"detail": "Error: 'Air Quality' column not found in dataset."}

        # Drop missing values
        df.dropna(inplace=True)

        # Keep "Air Quality" while selecting numeric columns
        numeric_columns = [col for col in df.columns if df[col].dtype in [np.float64, np.int64] or col == "Air Quality"]
        df = df[numeric_columns]

        # Split into features (X) and target (y)
        X = df.drop(columns=["Air Quality"])
        y = df["Air Quality"].astype(str)  # Convert labels to strings

        # Retrain the model
        from sklearn.ensemble import RandomForestClassifier
        new_model = RandomForestClassifier(
            max_depth=20,
            max_features="sqrt",
            min_samples_leaf=1,
            min_samples_split=2,
            n_estimators=200,
            random_state=42
        )
        new_model.fit(X, y)

        # Save the updated model
        joblib.dump(new_model, MODEL_PATH)

        return {"message": "Model retrained successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Evaluate model endpoint
@app.get("/evaluate")
def evaluate():
    try:
        # Fetch evaluation data from MongoDB
        eval_data = list(collection.find({}, {"_id": 0}))
        if not eval_data:
            return {"message": "No evaluation data available."}

        for doc in eval_data:
            if isinstance(doc.get("PM2"), dict) and "5" in doc["PM2"]:
                doc["PM2.5"] = doc["PM2"]["5"]  # Extract actual PM2.5 value
            doc.pop("PM2", None) 

        df = pd.DataFrame(eval_data)
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
        expected_columns = ["Temperature", "Humidity", "PM2.5", 
                            "PM10", "NO2", "SO2", "CO", 
                            "Proximity_to_Industrial_Areas", "Population_Density"]
        df = df[expected_columns + ["Air Quality"]]

        X = df.drop(columns=["Air Quality"])
        y_true = df["Air Quality"].astype(str)

        # Get model predictions
        model = load_model()
        y_pred = model.predict(X)
        y_pred = [str(label) for label in y_pred]
        y_proba = model.predict_proba(X)

        # Calculate evaluation metrics
        from sklearn.metrics import accuracy_score, classification_report, log_loss
        accuracy = accuracy_score(y_true, y_pred)
        report = classification_report(y_true, y_pred, output_dict=True)
        loss = log_loss(y_true, y_proba)

        return {"accuracy": accuracy, "loss": loss, "classification_report": report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)