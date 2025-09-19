// backend/routes/workflow.js
const express = require("express");
const router = express.Router();
const { runWorkflow, getHistory } = require("../controllers/workflowController");

router.post("/run-workflow", runWorkflow);
router.get("/history", getHistory); // optional, if DB implemented

module.exports = router;
