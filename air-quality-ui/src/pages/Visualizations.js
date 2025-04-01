import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Visualizations = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Air Quality Data Visualizations</h2>
      <p className="text-center">
        These visualizations provide insights into air quality data, relationships between variables, and model interpretations.
      </p>

      <Row className="g-4">
        {/* Correlation Matrix */}
        <Col md={6}>
          <Card className="shadow">
            <Card.Img variant="top" src="/images/corr_matrix.png" alt="Correlation Matrix" />
            <Card.Body>
              <Card.Title>Correlation Matrix</Card.Title>
              <Card.Text>
                This heatmap shows the correlation between different air quality parameters. Darker colors indicate stronger correlations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* PDP Plot */}
        <Col md={6}>
          <Card className="shadow">
            <Card.Img variant="top" src="/images/pdp_plot.png" alt="Partial Dependence Plot" />
            <Card.Body>
              <Card.Title>Partial Dependence Plot (PDP)</Card.Title>
              <Card.Text>
                The PDP plot helps interpret the effect of a specific feature on air quality predictions, showing marginal effects.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Scatter Plot */}
        <Col md={6}>
          <Card className="shadow">
            <Card.Img variant="top" src="/images/scatter_plot.png" alt="Scatter Plot" />
            <Card.Body>
              <Card.Title>Scatter Plot</Card.Title>
              <Card.Text>
                This scatter plot visualizes the relationship between air pollution levels and a selected feature, highlighting trends.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* SHAP Plot */}
        <Col md={6}>
          <Card className="shadow">
            <Card.Img variant="top" src="/images/shap_plot.png" alt="SHAP Plot" />
            <Card.Body>
              <Card.Title>SHAP Plot</Card.Title>
              <Card.Text>
                SHAP values explain the impact of each feature on the model's predictions, helping to understand feature importance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Visualizations;

