import React, { useState } from "react";
import WorkflowForm from "./components/workflowForm";
import HistoryList from "./components/HistoryList";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Workflow Genie</h1>

      <div className="row vh-100 align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <WorkflowForm onResult={setResult} />
        </div>

        <div className="col-md-6">
          {result && (
            <div className="alert alert-dark text-white animate__animated animate__fadeIn">
              <h5>Final Result</h5>
              <p>{result.final_result}</p>
            </div>
          )}
          <HistoryList />
        </div>
      </div>
    </div>
  );
}

export default App;
