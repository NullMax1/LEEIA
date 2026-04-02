import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_KEY;

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMsg }]
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Servidor activo"));
