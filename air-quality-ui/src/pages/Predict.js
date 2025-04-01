import React, { useState } from "react";

const Predict = () => {
  const [formData, setFormData] = useState({
    Temperature: "",
    Humidity: "",
    PM10: "",
    NO2: "",
    SO2: "",
    CO: "",
    Proximity_to_Industrial_Areas: "",
    Population_Density: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://clean-air-sentinel.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setPrediction(data);
  };

  return (
    <div>
      <h1>Get Air Quality Prediction</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}: </label>
            <input type="text" name={key} value={formData[key]} onChange={handleChange} required />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction Result: {JSON.stringify(prediction)}</p>}
    </div>
  );
};

export default Predict;
