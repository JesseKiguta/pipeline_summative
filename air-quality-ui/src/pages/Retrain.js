import React, { useState } from "react";

const Retrain = () => {
  const [message, setMessage] = useState("");

  const handleRetrain = async () => {
    const response = await fetch("https://clean-air-sentinel.onrender.com/retrain", { method: "POST" });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Retrain Model</h1>
      <button onClick={handleRetrain}>Retrain</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Retrain;
