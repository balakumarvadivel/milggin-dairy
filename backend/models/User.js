const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,     // allows null email
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,     // allows null phone
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user", "shop_owner"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
