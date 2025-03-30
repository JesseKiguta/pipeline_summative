from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def predict(self):
        self.client.post("/predict", json={
            "temperature": 25.3,
            "humidity": 60.2,
            "pm2_5": 35.1,
            "pm10": 50.2,
            "no2": 20.5,
            "so2": 8.3,
            "co": 0.6,
            "proximity_to_industrial_areas": 1.2,
            "population_density": 1500
        })
