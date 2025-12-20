const express = require("express");
const router = express.Router();
const sendOrderMessage = require("../utils/message");
const Order = require("../models/Order");
const { authMiddleware, shopOwnerOnly } = require("../middleware/auth");

// GET ALL ORDERS
router.get("/", authMiddleware, shopOwnerOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// UPDATE ORDER STATUS
router.put("/:id/status", authMiddleware, shopOwnerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Send notification message
    await sendOrderMessage(order, status);

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// PREORDER
router.post("/preorder", async (req, res) => {
  try {
    const orderData = req.body;

    const newOrder = new Order({
      ...orderData,
      type: "preorder"
    });

    await newOrder.save();

    await sendOrderMessage(orderData, "preorder");

    res.json({ success: true, message: "Preorder saved", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Preorder failed" });
  }
});

// NORMAL ORDER
router.post("/order", async (req, res) => {
  try {
    const orderData = req.body;

    const newOrder = new Order({
      ...orderData,
      type: "order"
    });

    await newOrder.save();

    await sendOrderMessage(orderData, "order");

    res.json({ success: true, message: "Order saved", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});

module.exports = router;
