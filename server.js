require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("HealCart Backend Running 🚀");
});

// Click route
app.post("/api/click", (req, res) => {
  const { platform } = req.body;
  console.log("Clicked:", platform);
  res.json({ message: "Click received" });
});

// Connect DB (optional for now)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healcart")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
