import React, { useState } from "react";
import { Container, Card, Button, Alert, Spinner, Table } from "react-bootstrap";

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchSummary = async () => {
    setSummary(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://clean-air-sentinel.onrender.com/data_summary");

      const data = await response.json();

      if (response.ok) {
        setSummary(data);
      } else {
        setError(data.detail || "An error occurred while fetching data summary.");
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
        <h2>Data Summary</h2>
        <p>
          The air quality dataset is continuously updated with new readings. 
          Click the button below to view statistical insights, including 
          average pollutant levels and data distributions.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}
        {summary && (
          <Card className="p-3 mt-3">
            <h4>Summary Statistics</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.replace(/_/g, " ")}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        <div className="d-grid mt-3">
          <Button variant="info" onClick={handleFetchSummary} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Fetching...
              </>
            ) : (
              "Fetch Summary"
            )}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Summary;


