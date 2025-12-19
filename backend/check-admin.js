require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const admin = await User.findOne({ email: "admin@tamildairy.com" });
    if (admin) {
      console.log("Admin user found:");
      console.log("Name:", admin.name);
      console.log("Email:", admin.email);
      console.log("Role:", admin.role);
      console.log("Password Hash exists:", !!admin.passwordHash);
    } else {
      console.log("Admin user not found");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

checkAdmin();