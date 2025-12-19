require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const user = await User.findOne({ email: "shop@tamildairy.com" });
    if (user) {
      console.log("User found:", { name: user.name, email: user.email, role: user.role });
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

checkUser();