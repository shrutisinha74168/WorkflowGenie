import axios from "axios";

// Backend URL
const API_URL = "http://localhost:5000/api";

// Toggle for mock testing
const USE_MOCK = false;

/**
 * Run workflow: send prompt + action to backend
 * @param {string} prompt
 * @param {string} action
 * @returns {Promise<{final_result: string}>}
 */
export const runWorkflow = async (prompt, action) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          final_result: `[Mock ${action}] ${prompt.slice(0, 50)}...`,
        });
      }, 500);
    });
  }

  try {
    const res = await axios.post(`${API_URL}/run-workflow`, { prompt, action }); 
    return res.data; 
  } catch (err) {
    console.error("Error running workflow:", err);
    return { final_result: "Error connecting to backend" };
  }
};

/**
 * Get workflow history from backend
 * @returns {Promise<Array>}
 */
export const getHistory = async () => {
  try {
    const res = await axios.get(`${API_URL}/history`);
    return res.data;
  } catch (err) {
    console.error("Error fetching history:", err);
    return [];
  }
};
