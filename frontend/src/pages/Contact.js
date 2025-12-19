import React, { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    email: "",
    address: "",
    confirm: false,
  });

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);
  const [orderDone, setOrderDone] = useState(false);
  const [message, setMessage] = useState("");

  const addToCart = () => {
    if (!product || !quantity || quantity <= 0) {
      alert("Please enter product & valid quantity");
      return;
    }

    const newItem = { product, quantity };
    setCart((prev) => [...prev, newItem]);
    setProduct("");
    setQuantity("");
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleFormChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Add at least one product to Pre-Order Cart!");
      return;
    }

    if (!form.confirm) {
      alert("Please tick the confirmation checkbox.");
      return;
    }

    const orderData = {
      ...form,
      products: cart,
    };

    try {
      const res = await axios.post("http://localhost:5000/orders/preorder", orderData);

      if (res.data.success) {
        setMessage(res.data.message);
        setOrderDone(true);
        setCart([]);
        setForm({
          name: "",
          phone: "",
          altPhone: "",
          email: "",
          address: "",
          confirm: false,
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-8 md:p-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 border rounded-xl shadow-sm flex items-start gap-4">
          <Phone className="text-green-600" size={28} />
          <div>
            <h2 className="text-xl font-semibold">Call Us</h2>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        <div className="p-6 border rounded-xl shadow-sm flex items-start gap-4">
          <Mail className="text-blue-600" size={28} />
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-600">farmfresh@gmail.com</p>
          </div>
        </div>

        <div className="p-6 border rounded-xl shadow-sm flex items-start gap-4">
          <MapPin className="text-red-600" size={28} />
          <div>
            <h2 className="text-xl font-semibold">Address</h2>
            <p className="text-gray-600">
              Tamil Dairy Farm,<br />
              Coimbatore, Tamil Nadu.
            </p>
          </div>
        </div>

        <div className="p-6 border rounded-xl shadow-sm flex items-start gap-4">
          <MessageCircle className="text-green-500" size={28} />
          <div>
            <h2 className="text-xl font-semibold">WhatsApp</h2>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Preorder Form */}
      <div className="bg-green-50 border border-green-300 rounded-2xl p-10 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={32} className="text-green-700" />
          <h2 className="text-3xl font-bold text-green-800">Pre-Order Now</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Details */}
          <input type="text" name="name" placeholder="Full Name" required className="w-full p-3 border rounded-lg" value={form.name} onChange={handleFormChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required className="w-full p-3 border rounded-lg" value={form.phone} onChange={handleFormChange} />
          <input type="tel" name="altPhone" placeholder="Alternate Phone (Optional)" className="w-full p-3 border rounded-lg" value={form.altPhone} onChange={handleFormChange} />
          <input type="email" name="email" placeholder="Email (Optional)" className="w-full p-3 border rounded-lg" value={form.email} onChange={handleFormChange} />
          <textarea name="address" placeholder="Delivery Address" required className="w-full p-3 border rounded-lg h-28" value={form.address} onChange={handleFormChange} />

          {/* Product Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="p-3 border rounded-lg" value={product} onChange={(e) => setProduct(e.target.value)}>
              <option value="">Select Product</option>
              <option>Eggs</option>
              <option>Milk</option>
              <option>Ghee</option>
              <option>Butter</option>
              <option>Mutton</option>
              <option>Chicken (Broiler)</option>
              <option>Country Chicken</option>
              <option>Kadaknath</option>
            </select>

            <input type="number" className="p-3 border rounded-lg" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>

          <button type="button" onClick={addToCart} className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800">
            Add to Preorder Cart
          </button>

          {/* Cart Display */}
          {cart.length > 0 && (
            <div className="bg-white p-5 border rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Your Preorder Cart</h3>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="font-semibold">{item.product}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeItem(index)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Confirm */}
          <div className="flex items-center gap-3">
            <input type="checkbox" name="confirm" checked={form.confirm} onChange={handleFormChange} className="h-5 w-5" />
            <label className="text-lg font-semibold">I confirm the above details are correct.</label>
          </div>

          {/* Submit */}
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full p-4 rounded-lg text-xl font-semibold transition">
            Submit Final Preorder
          </button>
        </form>
      </div>

      {/* Final Confirmation Modal */}
      {orderDone && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Pre-Order Confirmed!</h2>
            <p className="text-gray-700">{message}</p>
            <button onClick={() => setOrderDone(false)} className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg font-bold">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
