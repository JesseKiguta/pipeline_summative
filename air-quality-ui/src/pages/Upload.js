import React, { useState } from "react";

const Upload = () => {
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const response = await fetch("https://clean-air-sentinel.onrender.com/upload", { method: "POST" });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Upload Data</h1>
      <button onClick={handleUpload}>Upload Data</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;

