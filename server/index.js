import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware
app.use(cors());
app.use(express.json());

/* ================================
   ✅ ROOT ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ================================
   ✅ HEALTH CHECK
================================ */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    apiKeySet: !!process.env.GEMINI_API_KEY,
  });
});

/* ================================
   ✅ CHAT API
================================ */
app.post("/api/chat", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY not found in .env",
      });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages must be an array",
      });
    }

    console.log("👉 Using API KEY:", apiKey.substring(0, 10));

    // ✅ Gemini API Call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
          generationConfig: {
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Gemini API Error:", errorData);

      return res.status(response.status).json({
        error: errorData?.error?.message || "Gemini API error",
      });
    }

    const data = await response.json();

    // ✅ SAFE RESPONSE EXTRACTION (FIXED)
    let text = "Sorry, I couldn't process that.";

    if (data?.candidates?.length > 0) {
      const parts = data.candidates[0]?.content?.parts;

      if (parts && parts.length > 0) {
        text = parts.map((p) => p.text).join(" ");
      }
    }

    console.log("✅ Gemini Raw Response:", JSON.stringify(data, null, 2));

    res.json({
      reply: text,
    });

  } catch (error) {
    console.error("❌ Server Error:", error.message);

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

/* ================================
   ✅ START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `🔑 API Key: ${
      process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌"
    }`
  );
});