// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Farm from "./pages/Farm";
import Branches from "./pages/Branches";
import Order from "./pages/Order";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AcceptOrders from "./pages/AcceptOrders";

// -------------------------------
// 💥 PRODUCT DATA
// -------------------------------
const initialProducts = [
  {
    category: "Eggs",
    items: [
      { id: 1, name: "Broiler Egg", price: 6 },
      { id: 2, name: "Kadaknath Egg", price: 30 },
      { id: 3, name: "Nattukoli Egg", price: 12 },
    ],
  },
  {
    category: "Meat",
    items: [
      { id: 4, name: "Mutton", price: 750 },
      { id: 5, name: "Chicken – Broiler", price: 160 },
      { id: 6, name: "Chicken – Country", price: 280 },
      { id: 7, name: "Chicken – Kadaknath", price: 800 },
    ],
  },
  {
    category: "Milk Products",
    items: [
      { id: 8, name: "Cow Milk – Jersey", price: 50 },
      { id: 9, name: "Cow Milk – Naatu Mattu Paal", price: 70 },
      { id: 10, name: "Ghee", price: 550 },
      { id: 11, name: "Butter", price: 400 },
      { id: 12, name: "Milk Sweets", price: 250 },
    ],
  },
];

// -------------------------------
// 💥 PRIVATE ROUTE COMPONENT
// -------------------------------
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if logged in
  return token ? children : <Navigate to="/login" replace />; // must match lowercase path
};

// -------------------------------
// 💥 APP COMPONENT
// -------------------------------
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow pt-20">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branches" element={<Branches />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/farm"
              element={
                <PrivateRoute>
                  <Farm />
                </PrivateRoute>
              }
            />
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <Order products={initialProducts} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/accept-orders"
              element={<AcceptOrders />}
            />

            {/* Fallback route: redirect unknown URLs to home or login */}
            <Route
              path="*"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
