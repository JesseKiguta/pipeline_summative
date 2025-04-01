import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const Predict = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    pm10: "",
    no2: "",
    so2: "",
    co: "",
    proximity_to_industrial_areas: "",
    population_density: "",
  });

  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction("");

    console.log("Form data being sent:", formData);

    try {
        const response = await fetch("https://clean-air-sentinel.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Full API Response:", data);

        if (response.ok) {
            console.log("Extracting Prediction...");
            if (data["Air Quality"]) {
                setPrediction(data["Air Quality"]);
            } else {
                setError(`Missing 'Air Quality'. Response: ${JSON.stringify(data)}`);
            }
        } else {
            setError(`API Error: ${JSON.stringify(data)}`);
        }
    } catch (error) {
        setError("Failed to connect to the API.");
    }
};


  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="text-center">Predict Air Quality</h2>
        <p className="text-center">Enter the parameters below to predict air quality levels.</p>

        {error && <Alert variant="danger">{error}</Alert>}
        {prediction !== "" && (
          <Alert variant="success">
            <strong>Prediction Result:</strong> {prediction}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="text-capitalize">{key.replace(/_/g, " ")}</Form.Label>
              <Form.Control
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Get Prediction
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Predict;
