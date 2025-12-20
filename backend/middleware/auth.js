const jwt = require("jsonwebtoken");

// AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// SHOP OWNER ONLY
const shopOwnerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "shop_owner") {
    return res.status(403).json({ error: "Shop owner access only" });
  }
  next();
};
// ADMIN ONLY ACCESS
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};


module.exports = {
  authMiddleware,
  shopOwnerOnly,
  adminOnly,
};
