# Workflow Genie

Workflow Genie is a full-stack project built for the assignment.  
It demonstrates how an **AI agent** can work together with **external APIs** (Weather, News, GitHub) to generate a combined meaningful output.

---

## What this project does
- User gives a **prompt** (example: “Write a tweet about today’s weather”)  
- User selects an **API** (Weather / News / GitHub)  
- Backend:
  - AI Agent (OpenAI / Mock) generates a short response  
  - Selected API provides real-time data  
  - Both are **combined into a final result**  
- Final result is shown on the **frontend**  
- Each run is stored in **MongoDB**, and history can be fetched later  
