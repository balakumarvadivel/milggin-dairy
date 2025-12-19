require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function deleteAllUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

deleteAllUsers();