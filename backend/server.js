require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin"); // if you have admin routes

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

// Health check route
app.get("/api/health", (req, res) => {
  res.send("Backend is running!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(buildPath));

  app.get(/^\/(?!api\/).*$/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
