const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    action: { type: String, required: true },
    aiResponse: { type: String },
    apiResponse: { type: String },
    finalResult: { type: String },
  },
  { timestamps: true } // 👈 createdAt, updatedAt auto add
);

module.exports = mongoose.model("History", historySchema);
