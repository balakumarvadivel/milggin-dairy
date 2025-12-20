// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// SIGNUP route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !password || (!email && !phone))
      return res.status(400).json({ error: "All fields required" });

    const existingUser = email ? await User.findOne({ email }) : null;
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: email || null,
      phone: phone || null,
      passwordHash,
      role:
        email === "admin@tamildairy.com"
          ? "admin"
          : email === "shop@tamildairy.com"
          ? "shop_owner"
          : "user",
    });

    await newUser.save();

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// LOGIN route
router.post("/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone))
      return res.status(400).json({ error: "Email/phone and password required" });

    const user = email
      ? await User.findOne({ email: new RegExp('^' + email + '$', 'i') })
      : await User.findOne({ phone });

    if (!user) return res.status(400).json({ error: "Invalid email or phone" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// SHOP OWNER LOGIN route
router.post("/shop-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: new RegExp('^' + email + '$', 'i') });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    if (user.role !== "shop_owner") return res.status(403).json({ error: "Access denied" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Shop login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
