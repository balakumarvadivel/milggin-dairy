require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@tamildairy.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("admin123", salt);

    const admin = new User({
      name: "Admin",
      email: "admin@tamildairy.com",
      passwordHash,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();