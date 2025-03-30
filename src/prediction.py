import pandas as pd
import joblib

def load_model(filename="best_rf_model.pkl"):
    """Load the trained model from a file."""
    model = joblib.load(filename)
    print(f"Model loaded from {filename}")
    return model

def make_prediction(model, input_data):
    """Make a prediction using the loaded model."""
    predictions = model.predict(input_data)
    return predictions

if __name__ == "__main__":
    model = load_model()

    # Example input data for prediction, edit the values as needed
    input_data = pd.DataFrame({
        'Temperature': 0,
        'Humidity': 0,
        'PM10': 0,
        'NO2': 0,
        'SO2': 0,
        'CO': 0,
        'Proximity_to_Industrial_Areas': 0,
        'Population_Density': 0,
    })

    # Make predictions
    predictions = make_prediction(model, input_data)
    print("Predictions:", predictions)