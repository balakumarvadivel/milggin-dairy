import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --------------------- HELPER FUNCTIONS ---------------------

// Filter orders based on day/week/month/year
const filterOrders = (orders, filterType) => {
  const now = new Date();
  return orders.filter((order) => {
    const orderDate = new Date(order.date);
    switch (filterType) {
      case "day":
        return orderDate.toDateString() === now.toDateString();
      case "week":
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return orderDate >= weekStart && orderDate < weekEnd;
      case "month":
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      case "year":
        return orderDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });
};

// Calculate total revenue from orders
const calculateTotal = (orders) => {
  return orders.reduce((total, order) => total + order.total, 0);
};

// Get customer stats: regular vs non-regular
const getCustomerStats = (orders) => {
  const customerCount = {};
  orders.forEach((order) => {
    if (customerCount[order.name]) customerCount[order.name]++;
    else customerCount[order.name] = 1;
  });
  const regular = Object.entries(customerCount).filter(
    ([_, count]) => count > 1
  ).length;
  const nonRegular = Object.entries(customerCount).filter(
    ([_, count]) => count === 1
  ).length;
  return { regular, nonRegular };
};

// Generate chart data for revenue trends
const generateRevenueChartData = (orders, filter) => {
  const dataMap = {};
  orders.forEach((order) => {
    const orderDate = new Date(order.date);
    let key = "";
    switch (filter) {
      case "day":
        key = orderDate.getHours() + ":00";
        break;
      case "week":
        key = `Day ${orderDate.getDay()}`;
        break;
      case "month":
        key = orderDate.getDate();
        break;
      case "year":
        key = orderDate.getMonth() + 1;
        break;
      default:
        key = orderDate.toDateString();
    }
    if (!dataMap[key]) dataMap[key] = 0;
    dataMap[key] += order.total;
  });
  return Object.entries(dataMap).map(([name, total]) => ({ name, total }));
};

// Get top items sold
const getTopItems = (orders) => {
  const itemMap = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemMap[item.name]) itemMap[item.name] = 0;
      itemMap[item.name] += item.quantity;
    });
  });
  const sortedItems = Object.entries(itemMap)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
  return sortedItems.slice(0, 10); // top 10
};

// Prepare data for Pie chart of customer distribution
const generateCustomerPieData = (orders) => {
  const customerMap = {};
  orders.forEach((order) => {
    if (!customerMap[order.name]) customerMap[order.name] = 0;
    customerMap[order.name] += 1;
  });
  return Object.entries(customerMap).map(([name, value]) => ({ name, value }));
};

// CSV Export (stub)
const exportCSV = (orders, filename = "orders.csv") => {
  const csvRows = [];
  const headers = ["Customer", "Items", "Quantity", "Amount", "Date"];
  csvRows.push(headers.join(","));
  orders.forEach((order) => {
    const items = order.items.map((i) => i.name).join("|");
    const qty = order.items.map((i) => i.quantity).join("|");
    const row = [order.name, `"${items}"`, `"${qty}"`, order.total, order.date];
    csvRows.push(row.join(","));
  });
  const csvData = csvRows.join("\n");
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// --------------------- MAIN ADMIN DASHBOARD ---------------------

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [preorders, setPreorders] = useState([]);
  const [filter, setFilter] = useState("day");
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {

          headers: { Authorization: `Bearer ${token}` },
        });
        const allOrders = res.data.orders || [];
        setOrders(allOrders.filter((o) => o.type === "order"));
        setPreorders(allOrders.filter((o) => o.type === "preorder"));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filtered orders for current view
  const filteredOrders = filterOrders(orders, filter);
  const filteredPreorders = filterOrders(preorders, filter);

  const totalAmount = calculateTotal(filteredOrders);
  const { regular, nonRegular } = getCustomerStats(filteredOrders);
  const revenueChartData = generateRevenueChartData(filteredOrders, filter);
  const topItems = getTopItems(filteredOrders);
  const customerPieData = generateCustomerPieData(filteredOrders);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA00FF",
    "#FF0066",
    "#00AAFF",
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : (
        <>
          {/* FILTER & SUMMARY */}
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <label className="mr-2 font-medium">Filter by:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="flex gap-6">
              <div>
                <p className="font-semibold">Total Orders</p>
                <p className="text-xl">{filteredOrders.length}</p>
              </div>
              <div>
                <p className="font-semibold">Total Revenue</p>
                <p className="text-xl">₹{totalAmount}</p>
              </div>
              <div>
                <p className="font-semibold">Regular Customers</p>
                <p className="text-xl">{regular}</p>
              </div>
              <div>
                <p className="font-semibold">Non-Regular Customers</p>
                <p className="text-xl">{nonRegular}</p>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => exportCSV(filteredOrders)}
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueChartData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Top Items</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topItems}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Customer Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {customerPieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ORDERS TABLE */}
          <div className="overflow-x-auto bg-white p-4 rounded shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Orders List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Customer</th>
                  <th className="border p-2">Items</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border p-2">{order.name}</td>
                    <td className="border p-2">
                      {order.items.map((item) => item.name).join(", ")}
                    </td>
                    <td className="border p-2">
  <table className="w-full text-sm border">
 <tbody>
  {filteredOrders.map((order, idx) => (
    <tr key={idx} className="hover:bg-gray-100 align-top">
      
      {/* Customer */}
      <td className="border p-2">{order.name}</td>

      {/* Products Table */}
      <td className="border p-2">
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1 text-center">
                  {item.quantity}
                </td>
                <td className="border px-2 py-1 text-right">
                  ₹{item.price}
                </td>
                <td className="border px-2 py-1 text-right">
                  ₹{item.quantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>

      {/* Order Total */}
      <td className="border p-2 font-semibold text-right">
        ₹{order.total}
      </td>

      {/* Date */}
      <td className="border p-2">
        {new Date(order.date).toLocaleString()}
      </td>

    </tr>
  ))}
</tbody>

  </table>
</td>

<td className="border p-2 font-semibold">
  ₹{order.total}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PREORDERS TABLE */}
          <div className="overflow-x-auto bg-white p-4 rounded shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Preorders List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Customer</th>
                  <th className="border p-2">Items</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPreorders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border p-2">{order.name}</td>
                    <td className="border p-2">
                      {order.items.map((item) => item.name).join(", ")}
                    </td>
                    <td className="border p-2">
                      {order.items.map((item) => item.quantity).join(", ")}
                    </td>
                    <td className="border p-2">₹{order.total}</td>
                    <td className="border p-2">
                      {new Date(order.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
