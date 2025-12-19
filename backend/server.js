require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/orders", orderRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
