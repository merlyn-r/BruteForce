const express = require("express");
const cors = require("cors");
const { recordAttempt } = require("./auth");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/face", (req, res) => {
  const { facialId, gps } = req.body;
  if (!facialId) return res.status(400).json({ error: "Missing facialId" });

  // Assume face auth success from frontend
  const result = recordAttempt({ facialId, gps, success: true });

  res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
