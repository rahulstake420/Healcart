const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("HealCart Backend Running 🚀");
});

// API test
app.get("/api/test", (req, res) => {
  res.json({ message: "API Working ✅" });
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
