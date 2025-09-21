const { callAI } = require("../services/aiService");
const { callAPI } = require("../services/apiService");
const History = require("../models/History"); 

// Run Workflow
const runWorkflow = async (req, res) => {
  try {
    const { prompt, action } = req.body;
    console.log("Received Prompt:", prompt);
    console.log("Received Action:", action);

    //  AI Agent call
    let aiResponse;
    try {
      aiResponse = await callAI(prompt);
      console.log("AI Response:", aiResponse);
    } catch (aiError) {
      console.error("Error in callAI:", aiError);
      aiResponse = "AI placeholder response";
    }

    // Third-party API call
    let apiResponse;
    try {
      apiResponse = await callAPI(action);
      console.log("API Response:", apiResponse);
    } catch (apiError) {
      console.error("Error in callAPI:", apiError);
      apiResponse = "API placeholder response";
    }

    //  Combine result
    const finalResult = `${aiResponse} ${apiResponse} #${action}`;

    //  Save to MongoDB (History collection)
    const historyEntry = new History({
      prompt,
      action,
      aiResponse,
      apiResponse,
      finalResult,
    });
    await historyEntry.save();

    res.json({
      ai_response: aiResponse,
      api_response: apiResponse,
      final_result: finalResult,
    });
  } catch (error) {
    console.error("Error in runWorkflow:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get last 10 histories from DB
const getHistory = async (req, res) => {
  try {
    const histories = await History.find().sort({ createdAt: -1 }).limit(10);
    res.json(histories);
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

module.exports = { runWorkflow, getHistory };
