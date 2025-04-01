import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://clean-air-sentinel.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "File uploaded successfully!");
        setError(null);
      } else {
        setError(data.detail || "An error occurred during upload.");
      }
    } catch (error) {
      setError("Failed to connect to the API.");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="text-center">Upload Data</h2>
        <p className="text-center">
          Upload a CSV file containing air quality readings to update the database.
        </p>
        <p>
          The file should contain the following columns: <strong>Temperature, Humidity, PM10, NO2, SO2, CO, Proximity_to_Industrial_Areas, Population_Density</strong>.
        </p>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select CSV File</Form.Label>
            <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Upload File
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Upload;

