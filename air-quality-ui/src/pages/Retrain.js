import React, { useState } from "react";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";

const Retrain = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRetrain = async () => {
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://clean-air-sentinel.onrender.com/retrain", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Model retrained successfully!");
      } else {
        setError(data.detail || "An error occurred during retraining.");
      }
    } catch (error) {
      setError("Failed to connect to the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4 text-center">
        <h2>Retrain the Model</h2>
        <p>
          Click the button below to retrain the air quality prediction model with the latest uploaded data.
          This process may take some time.
        </p>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="d-grid">
          <Button variant="warning" onClick={handleRetrain} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Retraining...
              </>
            ) : (
              "Retrain Model"
            )}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Retrain;
