const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { authMiddleware, adminOnly } = require("../middleware/auth");

/* =========================
   TOTAL REVENUE
========================= */
router.get("/revenue", authMiddleware, adminOnly, async (req, res) => {
  const result = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  res.json({ totalRevenue: result[0]?.total || 0 });
});

/* =========================
   ORDERS BY DAY
========================= */
router.get("/orders/day", authMiddleware, adminOnly, async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const orders = await Order.find({ createdAt: { $gte: today } });
  res.json({ count: orders.length, orders });
});

/* =========================
   ORDERS BY MONTH
========================= */
router.get("/orders/month", authMiddleware, adminOnly, async (req, res) => {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const orders = await Order.find({ createdAt: { $gte: start } });
  res.json({ count: orders.length, orders });
});

/* =========================
   TOP SELLING PRODUCTS
========================= */
router.get("/products/top", authMiddleware, adminOnly, async (req, res) => {
  const products = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        quantitySold: { $sum: "$items.quantity" }
      }
    },
    { $sort: { quantitySold: -1 } }
  ]);

  res.json(products);
});

/* =========================
   REGULAR vs NON-REGULAR
========================= */
router.get("/customers", authMiddleware, adminOnly, async (req, res) => {
  const customers = await Order.aggregate([
    { $group: { _id: "$user", orders: { $sum: 1 } } }
  ]);

  res.json({
    regularCustomers: customers.filter(c => c.orders >= 5),
    nonRegularCustomers: customers.filter(c => c.orders < 5)
  });
});

module.exports = router;
