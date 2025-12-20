const express = require("express");
const router = express.Router();
const sendOrderMessage = require("../utils/message");
const Order = require("../models/Order");
const { authMiddleware, shopOwnerOnly } = require("../middleware/auth");

/* ============================
   GET ALL ORDERS (ADMIN & SHOP OWNER)
============================ */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    // SHOP OWNER VIEW
    if (req.user.role === "shop_owner") {
      // SHOP OWNER VIEW
const shopOrders = orders.map(o => ({
  _id: o._id,
  name: o.name,
  phone: o.phone,
  items: (o.items || []).map(i => ({
    name: i.name,
    quantity: i.quantity,
    price: i.price || 0,
  })),
  total: o.total || 0,        // ✅ FIXED
  status: o.status || "pending", // ✅ FIXED
  type: o.type || "order",
  date: o.createdAt,
}));


      return res.json({ orders: shopOrders });
    }

    // ADMIN VIEW
    if (req.user.role === "admin") {
      const adminOrders = orders.map((o) => ({
        _id: o._id,
        name: o.name,
        phone: o.phone,
        email: o.email,
        address: o.address,
        items: (o.items || []).map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total: o.total || 0,   // ✅ FIX
        status: o.status || "pending",
        type: o.type || "order",
        date: o.createdAt,
      }));

      return res.json({ orders: adminOrders });
    }

    return res.status(403).json({ error: "Access denied" });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================
   UPDATE ORDER STATUS (SHOP OWNER ONLY)
============================ */
router.put("/:id/status", authMiddleware, shopOwnerOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await sendOrderMessage(order, status); // ✅ FIX

    res.json({ success: true, order });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

/* ============================
   CREATE PREORDER
============================ */
router.post("/preorder", async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      type: "preorder",
      status: "pending",
    });

    await newOrder.save();
    await sendOrderMessage(newOrder, "preorder"); // ✅ FIX

    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Preorder error:", err);
    res.status(500).json({ error: "Preorder failed" });
  }
});

/* ============================
   CREATE NORMAL ORDER
============================ */
router.post("/order", async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      type: "order",
      status: "pending",
    });

    await newOrder.save();
    await sendOrderMessage(newOrder, "order"); // ✅ FIX

    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order failed" });
  }
});

module.exports = router;
