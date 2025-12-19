// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  // Add phone to form state
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
   console.log("API URL:", process.env.REACT_APP_API_URL);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, form);

      if (res.data.success) {
        setMsg("Signup successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {msg && <div className="mb-4 text-red-600">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">Create Account</button>
      </form>
    </div>
  );
}
