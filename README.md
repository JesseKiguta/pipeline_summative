# **CleanAir Sentinel**

CleanAir Sentinel is an advanced **air quality monitoring system** that leverages **machine learning** to provide **real-time air quality predictions**. This project consists of a **React frontend** and a **FastAPI backend**, allowing users to analyze air pollution levels based on environmental data.

---

## **Dataset Used**
The dataset for this project was obtained from [Kaggle](https://www.kaggle.com/datasets/mujtabamatin/air-quality-and-pollution-assessment).

### **Features in the Dataset**
- **Temperature (°C)** – Ambient air temperature
- **Humidity (%)** – Relative humidity level
- **PM2.5 (µg/m³)** – Fine particulate matter concentration
- **PM10 (µg/m³)** – Coarse particulate matter concentration
- **NO₂ (ppm)** – Nitrogen Dioxide concentration
- **SO₂ (ppm)** – Sulfur Dioxide concentration
- **CO (ppm)** – Carbon Monoxide concentration
- **Proximity to Industrial Areas (km)** – Distance from major industrial zones
- **Population Density (people/km²)** – Number of people per square kilometer
- **Air Quality Level** – Categorized as `Good`, `Moderate`, `Poor`, or `Hazardous`

---

## **Model Performance**
The **Random Forest** model was used for classification, achieving the following metrics:

- **Accuracy:** `0.9560`  
- **Log Loss:** `0.1403`  

#### **Classification Report**
| Category   | Precision | Recall | F1-score | Support |
|------------|------------|--------|---------|---------|
| **Good**       | 1.00  | 1.00  | 1.00 | 409 |
| **Moderate**   | 0.96  | 0.97  | 0.97 | 294 |
| **Poor**       | 0.87  | 0.90  | 0.88 | 186 |
| **Hazardous**  | 0.92  | 0.86  | 0.89 | 111 |

- **Overall Accuracy:** `0.96`  
- **Macro Average:** `0.94`  
- **Weighted Average:** `0.96`

---

## **Frontend**
The frontend is a **React-based web application** that allows users to:
- **Predict air quality levels** based on input parameters
- **Upload new air quality datasets**
- **Retrain the machine learning model**
- **View data summaries and visualizations**

### **Live Frontend Link**
[Air Quality UI (React)](https://air-quality-pipeline.vercel.app/)

## **Backend**
The backend is built using **FastAPI** and provides a set of API endpoints for air quality prediction, data upload, and model retraining.

### **Live Backend API**
[FastAPI Docs](https://clean-air-sentinel.onrender.com/docs)

### **Main API Endpoints**
| **Method** | **Endpoint** | **Description** |
|------------|------------|----------------|
| `POST` | `/predict` | Predict air quality level |
| `POST` | `/upload` | Upload a CSV dataset |
| `POST` | `/retrain` | Retrain the model with new data |
| `GET`  | `/data_summary` | Get a summary of dataset statistics |

---

## **Demo Video**
*(Link to be added later)*

---

## **Setting Up Locally**
You can run the project locally using **Docker**.

### **1. Clone the Repository**
```
git clone https://github.com/JesseKiguta/pipeline_summative.git
cd pipeline_summative
```
### **2. Backend Setup**
```
docker run -d --name air-quality-backend cae9ee9b596717a56b7e80dea56ae2b1593496e06ac656de81703aad203e0348
```
### **3. Frontend Setup**
```
docker run -d -p 3000:3000 --name air-quality-frontend 349b4b595150fd8cf9bd46033b9f9a89e18fd7240a611b5b1cc6c398f9eca59d
```
### **4. Scripts for Preprocessing and Model Training**
| **Task**               | **Script**                  |
|------------------------|----------------------------|
| Data Preprocessing     | `src/preprocessing.py`     |
| Model Training        | `src/model.py`             |
| Prediction Script     | `src/prediction.py`        |

---

## **API Load Testing**
To simulate high request loads, Locust was used. Here's the command to test it (Make sure Locust is installed with ``` pip install locust ```)
```
locust -f locustfile.py --host=https://clean-air-sentinel.onrender.com
```
Here's the screenshot:
![Screenshot 2025-03-30 174428](https://github.com/user-attachments/assets/ba3b7bce-7ad5-4b4c-8c49-32661e79a012)

---

## **Contributors**
Jesse Kiguta (Project Lead & Developer)

---

## **License**
This project is licensed under the MIT License. Feel free to modify and improve!
