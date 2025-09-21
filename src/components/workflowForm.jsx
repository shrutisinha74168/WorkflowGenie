import React, { useState } from "react";
import { runWorkflow } from "./services/api";

function WorkflowForm() {
  const [prompt, setPrompt] = useState("");
  const [action, setAction] = useState("weather");
  const [result, setResult] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await runWorkflow(prompt, action);
      setResult(data.final_result); 
    } catch (error) {
      console.error("Error:", error);
      setResult("Something went wrong!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Workflow Generator</h3>
        <form onSubmit={handleSubmit}>
          {/* Prompt input */}
          <div className="mb-3">
            <label className="form-label">Enter Prompt</label>
            <input
              type="text"
              className="form-control"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write a tweet about today's weather..."
              required
            />
          </div>

          {/* Dropdown */}
          <div className="mb-3">
            <label className="form-label">Select API</label>
            <select
              className="form-select"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="weather">Weather</option>
              <option value="news">News</option>
              <option value="github">GitHub</option>
            </select>
          </div>

          {/* Submit button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Run Workflow
            </button>
          </div>
        </form>

        {/* Show result */}
        {result && (
          <div className="alert alert-info mt-4">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkflowForm;
