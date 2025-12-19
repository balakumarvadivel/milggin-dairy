import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img.jpg";

import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import img11 from "../assets/img11.jpg";
import img12 from "../assets/img12.jpg";
import img13 from "../assets/img13.jpg";

// ---------------- PRODUCTS ----------------
const featuredProducts = [
  { id: 1, name: "Broiler Egg", price: 6, img: img2 },
  { id: 2, name: "Kadaknath Egg", price: 25, img: img3 },
  { id: 3, name: "Country Egg", price: 12, img: img4 },

  { id: 4, name: "Mutton", price: 750, img: img5 },
  { id: 5, name: "Broiler Chicken", price: 160, img: img6 },
  { id: 6, name: "Country Chicken", price: 320, img: img7 },

  { id: 7, name: "Kadaknath Meat", price: 850, img: img8 },
  { id: 8, name: "Jersey Milk", price: 50, img: img9 },
  { id: 9, name: "Nattu Mattu Milk", price: 70, img: img10 },

  { id: 10, name: "Ghee", price: 650, img: img11 },
  { id: 11, name: "Butter", price: 420, img: img12 },
  { id: 12, name: "Milk Sweet", price: 300, img: img13 },
];

// ---------------- TESTIMONIALS ----------------
const testimonials = [
  { id: 1, name: "Ramesh", comment: "Fresh eggs and milk delivered on time." },
  { id: 2, name: "Kavya", comment: "Chicken quality is excellent and hygienic." },
  { id: 3, name: "Suresh", comment: "Best ghee and butter in town!" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <section className="bg-green-700 text-white py-32 px-5 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Milggin Dairy 🥛</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Farm-fresh eggs, milk, meat & dairy products delivered to your doorstep.
        </p>
        <button
          className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500"
          onClick={() => navigate("/contact")}
        >
          Pre-Order Now
        </button>
      </section>

      {/* ABOUT */}
      <section className="py-20 max-w-6xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12">About Milggin Dairy</h2>

        <div className="md:flex gap-10 items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-40 rounded-full border-4 border-yellow-400 shadow mx-auto"
          />

          <div>
            <p className="text-lg mb-4">
              Milggin Dairy delivers fresh, hygienic, and high-quality products
              directly from trusted farms.
            </p>
            <p className="text-lg mb-4">
              Eggs, milk, meat, ghee, butter & sweets – all in one place.
            </p>
            <p className="text-lg">
              Experience real farm freshness with Tamil Dairy.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-5">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-60 h-44 object-cover mx-auto rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-green-700 font-bold text-xl">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500"
            onClick={() => navigate("/contact")}
          >
            Pre-Order Now
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl text-center"
            >
              <p className="italic mb-4">“{t.comment}”</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
