import React, { useEffect, useState } from "react";
import { getHistory } from "./services/api.js";

function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-4">
      <h4>History</h4>
      <ul className="list-group">
        {history.map((item, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{item.prompt}</strong> → {item.finalResult}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
