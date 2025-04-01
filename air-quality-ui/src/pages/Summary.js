import React, { useState } from "react";

const Summary = () => {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    const response = await fetch("https://clean-air-sentinel.onrender.com/data_summary");
    const data = await response.json();
    setSummary(data);
  };

  return (
    <div>
      <h1>Data Summary</h1>
      <button onClick={fetchSummary}>Show Summary</button>
      {summary && <pre>{JSON.stringify(summary, null, 2)}</pre>}
    </div>
  );
};

export default Summary;

