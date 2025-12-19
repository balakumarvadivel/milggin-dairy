require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health check
app.get("/api/health", (req, res) => {
  res.send("Backend is running!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/orders", orderRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Serve React for all routes except API
  app.get("*", (req, res) => {
    // Only send index.html for non-API routes
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
    }
  });
}


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
