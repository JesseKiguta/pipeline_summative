import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>CleanAir Sentinel</h1>
      <p>Welcome to the Air Quality Monitoring System</p>
      <nav>
        <Link to="/predict"><button>Get Prediction</button></Link>
        <Link to="/upload"><button>Upload Data</button></Link>
        <Link to="/retrain"><button>Retrain Model</button></Link>
        <Link to="/summary"><button>View Data Summary</button></Link>
        <Link to="/visualizations"><button>View Visualizations</button></Link>
      </nav>
      <div style={{ marginTop: "20px" }}>
        <h2>About the Project</h2>
        <p>
          CleanAir Sentinel is an advanced air quality monitoring system that leverages machine learning to provide accurate predictions and insights into air quality levels. Our goal is to empower communities with real-time data and analytics to combat air pollution effectively.
        </p>
        <p>
          This application allows users to predict air quality based on various parameters, upload new data for analysis, retrain the model with updated datasets, and visualize the results through interactive charts and graphs.
        </p>
        <p>
          Join us in our mission to create cleaner and healthier air for everyone!
        </p>
        <h2>Technologies Used</h2>
        <ul>
          <li>React.js for the frontend</li>
          <li>FastAPI for the backend API</li>
          <li>Machine Learning models for prediction</li>
          <li>MongoDB for data storage</li>
          <li>Docker for containerization</li>
          <li>Render for deployment</li>
          <li>GitHub for version control</li>
          <li>SwaggerUI for API testing</li>
          <li>Jupyter Notebook for data analysis</li>
          <li>Responsive design for mobile compatibility</li>
          <li>Axios for API requests</li>
        </ul>
      </div>
    </div>
  );
};

export default App;

