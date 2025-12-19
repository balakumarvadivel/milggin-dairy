import React, { useState } from "react";
import axios from "axios";

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

/*
========================================================
ORDER PAGE WITH:
- Quantity based eggs
- Weight based meat & dairy
- Unit selector (kg/g/litre/ml)
- Proper cart
- Proper order placing
========================================================
*/

export default function Order() {

  /* ================= STATE ================= */
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  /* ================= PRODUCTS ================= */

  const products = [
    {
      category: "Eggs",
      type: "qty",
      items: [
        { name: "Broiler Egg", price: 6, img: img2 },
        { name: "Kadaknath Egg", price: 25, img: img3 },
        { name: "Nattukoli Egg", price: 12, img: img4 },
      ],
    },
    {
      category: "Meat",
      type: "weight",
      items: [
        { name: "Mutton", price: 750, img: img5 },
        { name: "Chicken - Broiler", price: 160, img: img6 },
        { name: "Chicken - Country", price: 320, img: img7 },
        { name: "Chicken - Kadaknath", price: 850, img: img8 },
      ],
    },
    {
      category: "Milk Products",
      type: "volume",
      items: [
        { name: "Cow Milk (Jersey)", price: 50, img: img9 },
        { name: "Cow Milk (Naatu Mattu)", price: 70, img: img10 },
        { name: "Ghee", price: 650, img: img11 },
        { name: "Butter", price: 420, img: img12 },
        { name: "Milk Sweets", price: 300, img: img13 },
      ],
    },
  ];

  /* ================= HELPERS ================= */

  const calculateByUnit = (price, unit, value) => {
    if (unit === "kg" || unit === "litre") return price * value;
    if (unit === "g" || unit === "ml") return price * (value / 1000);
    return 0;
  };

  /* ================= ADD TO CART ================= */

  const addToCart = (item, type, unit, value) => {
    if (!value || value <= 0) {
      setMsgType("error");
      setMessage("Please enter valid quantity / weight");
      return;
    }

    let total = 0;
    let qtyLabel = "";

    if (type === "qty") {
      total = item.price * value;
      qtyLabel = `${value} pcs`;
    } else {
      total = calculateByUnit(item.price, unit, value);
      qtyLabel = `${value} ${unit}`;
    }

    setCart(prev => [
      ...prev,
      {
        name: item.name,
        price: item.price,
        qty: qtyLabel,
        total: Math.round(total),
      }
    ]);

    setMsgType("success");
    setMessage(`${item.name} added to cart`);
  };

  /* ================= PLACE ORDER ================= */

  const placeOrder = async () => {
    if (!cart.length) {
      setMsgType("error");
      setMessage("Cart is empty");
      return;
    }

    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      setMsgType("error");
      setMessage("Fill all customer details");
      return;
    }

    const payload = {
  ...customerDetails,
  items: cart,
  total: cart.reduce((s, i) => s + i.total, 0),
  type: "order" // or "preorder" if it’s a preorder
};


    try {
      await axios.post(
  "https://milggin-dairy-14.onrender.com/order",  // singular 'order'
  payload,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  }
);

      setMsgType("success");
      setMessage("Order placed successfully!");
      setCart([]);
      setCustomerDetails({ name: "", phone: "", address: "" });
    } catch {
      setMsgType("error");
      setMessage("Order failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Place Your Order
      </h1>

      {products.map(section => (
        <div key={section.category} className="mb-10">

          <h2 className="text-2xl font-bold mb-4 text-green-800">
            {section.category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.items.map(item => (
              <div key={item.name} className="bg-white p-4 rounded-xl shadow">

                <img
                  src={item.img}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded"
                />

                <h3 className="text-xl font-bold mt-3">{item.name}</h3>
                <p className="text-green-600 font-semibold">
                  ₹{item.price} {section.type !== "qty" ? "/kg or litre" : "/piece"}
                </p>

                {section.type === "qty" ? (
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    className="w-full border p-2 mt-2"
                    id={`${item.name}-qty`}
                  />
                ) : (
                  <>
                    <select
                      className="w-full border p-2 mt-2"
                      id={`${item.name}-unit`}
                    >
                      {section.type === "weight" ? (
                        <>
                          <option value="kg">Kg</option>
                          <option value="g">Gram</option>
                        </>
                      ) : (
                        <>
                          <option value="litre">Litre</option>
                          <option value="ml">ML</option>
                        </>
                      )}
                    </select>

                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="Enter value"
                      className="w-full border p-2 mt-2"
                      id={`${item.name}-value`}
                    />
                  </>
                )}

                <button
                  className="w-full bg-green-600 text-white mt-3 py-2 rounded"
                  onClick={() => {
                    if (section.type === "qty") {
                      addToCart(
                        item,
                        "qty",
                        null,
                        document.getElementById(`${item.name}-qty`).value
                      );
                    } else {
                      addToCart(
                        item,
                        section.type,
                        document.getElementById(`${item.name}-unit`).value,
                        document.getElementById(`${item.name}-value`).value
                      );
                    }
                  }}
                >
                  Add to Cart
                </button>

              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CART + CUSTOMER DETAILS */}
      <div className="mt-12 p-6 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto">

        <h2 className="text-2xl font-bold text-green-800 mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">₹{item.total}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" className="p-2 font-bold">Total</td>
                  <td className="p-2 font-bold">
                    ₹{cart.reduce((s, i) => s + i.total, 0)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* CUSTOMER DETAILS */}
            <div className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={customerDetails.name}
                onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={customerDetails.phone}
                onChange={e => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address"
                value={customerDetails.address}
                onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              className="w-full bg-yellow-500 mt-5 py-3 rounded-xl font-bold"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </>
        )}
      </div>

      {/* MESSAGE POPUP */}
      {message && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`w-[90%] max-w-xl p-8 rounded-2xl text-center ${
            msgType === "success"
              ? "bg-white border-4 border-green-600 text-green-700"
              : "bg-white border-4 border-red-600 text-red-700"
          }`}>
            <h1 className="text-3xl font-bold mb-4">
              {msgType === "success" ? "SUCCESS!" : "ALERT!"}
            </h1>
            <p className="text-xl mb-6">{message}</p>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-xl"
              onClick={() => setMessage("")}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
