require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createShopOwner() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const existingShopOwner = await User.findOne({ email: "shop@tamildairy.com" });
    if (existingShopOwner) {
      console.log("Shop Owner already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("shop123", salt);

    const shopOwner = new User({
      name: "Shop Owner",
      email: "shop@tamildairy.com",
      passwordHash,
      role: "shop_owner",
    });

    await shopOwner.save();
    console.log("Shop Owner created successfully");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

createShopOwner();