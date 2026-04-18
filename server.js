const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // 👈 ADD THIS

const app = express();

app.use(express.json());
app.use(cors()); // 👈 ADD THIS

// Schema
const clickSchema = new mongoose.Schema({
  platform: String,
  time: { type: Date, default: Date.now },
  ip: String
});

const Click = mongoose.model("Click", clickSchema);

// Test route
app.get("/", (req, res) => {
  res.send("HealCart Backend Running 🚀");
});

// API test
app.get("/api/test", (req, res) => {
  res.json({ message: "API Working ✅" });
});

// 🔥 TRACK CLICK + SAVE IN DB
app.post("/track-click", async (req, res) => {
  try {
    const { platform } = req.body;

    const newClick = new Click({
      platform,
      ip: req.ip
    });

    await newClick.save();

    res.json({ success: true, message: "Saved to DB 💾" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
