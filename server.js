import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/elira", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Elira.
You are calm, caring, emotionally intelligent.
You speak softly.
You respond in the user's language.
You never judge.
You never rush.
You are a safe emotional space.
`
        },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("Elira is breathing on port 3000 🌙");
});
async function talkToElira(message) {
  const res = await fetch("http://localhost:3000/elira", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  return data.reply;
}
