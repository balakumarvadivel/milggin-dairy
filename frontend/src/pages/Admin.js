// src/pages/Admin.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Use useCallback to memoize fetchOrders so it can be safely added to useEffect deps
  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data.orders || []);
      setPreorders(res.data.preorders || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders from server.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // check if user is logged in and is admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') {
      alert("Access denied! Admins only.");
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [navigate, fetchOrders]); // ✅ include navigate and fetchOrders

  const renderOrderCard = (order, index) => (
    <div key={index} className="border rounded-xl p-5 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-2">{order.name}</h2>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Alternate Phone:</strong> {order.altPhone || "N/A"}</p>
      <p><strong>Email:</strong> {order.email || "N/A"}</p>
      <p><strong>Address:</strong> {order.address}</p>

      <h3 className="text-xl font-semibold mt-3 mb-1">Products:</h3>
      <ul className="list-disc list-inside">
        {order.products.map((item, idx) => (
          <li key={idx}>{item.product} × {item.quantity}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : (
        <>
          {/* Preorders */}
          <h2 className="text-3xl font-semibold mb-4">Preorders</h2>
          {preorders.length === 0 ? (
            <p className="text-gray-600 mb-6">No preorders yet.</p>
          ) : (
            <div className="space-y-6 mb-8">{preorders.map(renderOrderCard)}</div>
          )}

          {/* Orders */}
          <h2 className="text-3xl font-semibold mb-4">Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <div className="space-y-6">{orders.map(renderOrderCard)}</div>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
