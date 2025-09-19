// Dual-mode AI: use real OpenAI when possible, otherwise fallback to a mock response
const OpenAI = require("openai");
require("dotenv").config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;

// create client only if key exists
let client = null;
if (OPENAI_KEY) {
  client = new OpenAI({ apiKey: OPENAI_KEY });
}

const MOCK_RESPONSE = "It's a great day to be outside";

const callAI = async (prompt) => {
  // if no key, immediately return mock
  if (!client) {
    return MOCK_RESPONSE;
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const text = response?.choices?.[0]?.message?.content;
    if (text && text.trim().length > 0) return text.trim();

    // if OpenAI returned empty, fallback
    return MOCK_RESPONSE;
  } catch (err) {
    // log full error for debugging
    console.error("AI call error (will fallback to mock):", err?.response?.data || err?.message || err);
    return MOCK_RESPONSE;
  }
};

module.exports = { callAI };
