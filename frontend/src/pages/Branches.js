import React from "react";
import { useNavigate } from "react-router-dom";
export default function Branches() {
  const navigate = useNavigate();
  const branches = [
    {
      name: "Palani Branch",
      address: "No. 12, Main Street, Palani, Tamil Nadu",
      delivery: "Delivery charges: ₹50 within 5km",
      workers: ["Ravi", "Anbu", "Sundar"],
      map: "https://www.abitourism.com/img/palani/palani_thumb.jpg",
    },
    {
      name: "Erode Branch",
      address: "No. 45, Market Road, Erode, Tamil Nadu",
      delivery: "Delivery charges: ₹70 within 7km",
      workers: ["Kumar", "Vikram", "Mani"],
      map: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBmJFYIYqO0QSLi6nIUPn9Q9WgXRG5iD8y8A&s",
    },
    {
      name: "Upcoming Branch",
      address: "Coming Soon...",
      delivery: "Delivery charges TBD",
      workers: [],
      map: "https://www.thesurryamaxresidency.com/assets/image/blog/blog10/1.png",
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-24 px-5 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Branches 🏢</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Tamil Dairy is expanding to serve fresh products across multiple locations.
        </p>
        <button className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-500 transition">
          Contact Us
        </button>
      </section>

      {/* Branch Cards */}
      <section className="py-20 px-5 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Branch Locations</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {branches.map((branch, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <img src={branch.map} alt={branch.name} className="w-full h-56 object-cover mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2">{branch.name}</h3>
              <p className="mb-2">{branch.address}</p>
              <p className="mb-2 font-semibold">{branch.delivery}</p>
              <p className="mb-4 font-semibold">Workers:</p>
              <ul className="mb-4 list-disc list-inside">
                {branch.workers.length > 0
                  ? branch.workers.map((w, idx) => <li key={idx}>{w}</li>)
                  : <li>Staff not assigned yet</li>
                }
              </ul>
              <button className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800 transition">
                Pre-Order from this branch
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Info Section */}
      <section className="py-20 px-5 text-center">
        <h2 className="text-4xl font-bold mb-6">Delivery Details</h2>
        <p className="max-w-3xl mx-auto mb-6">
          Delivery is available from each branch. Charges depend on your distance from the branch. Pre-orders are recommended for guaranteed availability.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <button className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition">
            Calculate Delivery
          </button>
        <button
            className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
            onClick={() => navigate("/Contact")}
          >
            Pre-Order Now
          </button>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 px-5 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Branches on Map</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {branches.map((branch, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <iframe
                src={branch.map}
                title={branch.name}
                className="w-full h-56"
              ></iframe>
              <h3 className="text-2xl font-semibold p-4">{branch.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-5 text-center">
        <h2 className="text-3xl font-bold mb-6">Visit or Pre-Order From Our Branches</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Select your nearest branch and enjoy fresh Tamil Dairy products delivered to your doorstep.
        </p>
        <button
            className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
            onClick={() => navigate("/Contact")}
          >
            Pre-Order Now
          </button>
      </section>

      {/* Footer */}
      
    </div>
  );
}
