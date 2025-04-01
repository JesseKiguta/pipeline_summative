import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Card } from "react-bootstrap";

const App = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand as={Link} to="/">CleanAir Sentinel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/predict">Predict</Nav.Link>
              <Nav.Link as={Link} to="/upload">Upload Data</Nav.Link>
              <Nav.Link as={Link} to="/retrain">Retrain Model</Nav.Link>
              <Nav.Link as={Link} to="/summary">Data Summary</Nav.Link>
              <Nav.Link as={Link} to="/visualizations">Visualizations</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="text-center my-5">
        <h1 className="display-4 fw-bold">CleanAir Sentinel</h1>
        <p className="lead text-muted">
          Harnessing AI to monitor and predict air quality for a healthier future.
        </p>
        <Link to="/predict">
          <Button variant="primary" size="lg" className="mt-3">
            Get a Prediction
          </Button>
        </Link>
      </Container>

      {/* About Section */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src="/images/air_quality.jpg" alt="Air Quality Monitoring" className="img-fluid rounded shadow" />
          </Col>
          <Col md={6}>
            <h2>About CleanAir Sentinel</h2>
            <p>
              CleanAir Sentinel is an AI-powered air quality monitoring system designed to provide real-time insights and predictions on air pollution levels. Our mission is to empower individuals, communities, and policymakers with accurate data to drive environmental awareness and action.
            </p>
            <p>
              Through predictive modeling and interactive data visualizations, we help users understand air quality trends and take proactive measures to reduce pollution exposure.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Technologies Used */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Technologies Used</h2>
        <Row className="text-center">
          {[
            "React.js for frontend",
            "FastAPI for backend API",
            "Machine Learning models",
            "MongoDB for data storage",
            "Docker for containerization",
            "Render for deployment",
            "GitHub for version control",
            "SwaggerUI for API testing",
            "Jupyter Notebook for data analysis",
            "Responsive design for mobile compatibility",
            "Axios for API requests"
          ].map((tech, index) => (
            <Col md={4} key={index} className="mb-3">
              <Card className="shadow">
                <Card.Body>
                  <Card.Text>{tech}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>
          <p className="mb-0">© {new Date().getFullYear()} CleanAir Sentinel. All Rights Reserved.</p>
          <small>Empowering communities with data-driven insights for cleaner air.</small>
        </Container>
      </footer>
    </div>
  );
};

export default App;



