import React from "react";

const Visualizations = () => {
  return (
    <div>
      <h1>Air Quality Visualizations</h1>
      <img src="/images/corr_matrix.png" alt="Visualization 1" style={{ width: "500px", margin: "10px" }} />
      <img src="/images/pdp_plot.png" alt="Visualization 2" style={{ width: "500px", margin: "10px" }} />
      <img src="/images/scatter_plot.png" alt="Visualization 3" style={{ width: "500px", margin: "10px" }} />
      <img src="/images/shap_plot.png" alt="Visualization 4" style={{ width: "500px", margin: "10px" }} />
    </div>
  );
};

export default Visualizations;

