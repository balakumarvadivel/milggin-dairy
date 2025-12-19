require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function updatePassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const user = await User.findOne({ email: "shop@tamildairy.com" });
    if (!user) {
      console.log("User not found");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("shop123", salt);

    user.passwordHash = passwordHash;
    await user.save();
    console.log("Password updated to 'shop123'");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

updatePassword();