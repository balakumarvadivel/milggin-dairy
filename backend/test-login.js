require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const user = await User.findOne({ email: "shop@tamildairy.com" });
    if (!user) {
      console.log("User not found");
      return;
    }

    const validPassword = await bcrypt.compare("shop123", user.passwordHash);
    console.log("Password valid:", validPassword);
    console.log("User role:", user.role);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

testLogin();