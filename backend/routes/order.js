const express = require("express");
const router = express.Router();
const sendOrderMessage = require("../utils/message");
const Order = require("../models/Order");
const { authMiddleware, shopOwnerOnly, adminOnly } = require("../middleware/auth");

// -------------------------
// GET ALL ORDERS (ADMIN & SHOP OWNER)
// -------------------------
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    // Shop owner sees basic order data
    if (req.user.role === "shop_owner") {
      const shopOrders = orders.map(o => ({
        _id: o._id,
        name: o.name,
        phone: o.phone,
        items: o.items.map(i => ({
          name: i.name,
          quantity: i.quantity,
        })),
        total: o.totalAmount,
        type: o.type || "order",
        date: o.createdAt,
      }));
      return res.json({ orders: shopOrders });
    }

    // Admin sees full order data
    if (req.user.role === "admin") {
      const formattedOrders = orders.map(o => ({
        _id: o._id,
        name: o.name,
        phone: o.phone,
        email: o.email,
        address: o.address,
        items: o.items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total: o.totalAmount,
        type: o.type || "order",
        date: o.createdAt,
      }));
      return res.json({ orders: formattedOrders });
    }

    // Other roles: deny
    return res.status(403).json({ error: "Access denied" });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------
// UPDATE ORDER STATUS (SHOP OWNER ONLY)
// -------------------------
router.put("/:id/status", authMiddleware, shopOwnerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Send notification
    await sendOrderMessage(order, status);

    res.json({ success: true, order });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// -------------------------
// CREATE PREORDER
// -------------------------
router.post("/preorder", async (req, res) => {
  try {
    const orderData = req.body;

    const newOrder = new Order({
      ...orderData,
      type: "preorder",
    });

    await newOrder.save();
    await sendOrderMessage(orderData, "preorder");

    res.json({ success: true, message: "Preorder saved", order: newOrder });
  } catch (err) {
    console.error("Preorder error:", err);
    res.status(500).json({ error: "Preorder failed" });
  }
});

// -------------------------
// CREATE NORMAL ORDER
// -------------------------
router.post("/order", async (req, res) => {
  try {
    const orderData = req.body;

    const newOrder = new Order({
      ...orderData,
      type: "order",
    });

    await newOrder.save();
    await sendOrderMessage(orderData, "order");

    res.json({ success: true, message: "Order saved", order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order failed" });
  }
});

module.exports = router;
