// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // set default axios header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      // navigate based on role
      const user = res.data.user;
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "shop_owner") {
        navigate("/accept-orders");
      } else {
        navigate("/");
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {msg && <div className="mb-4 text-red-600">{msg}</div>}

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-gray-700 mb-1">Email or Phone</label>
          <input
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            placeholder="Enter your email or phone"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-700">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
