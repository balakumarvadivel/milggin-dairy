import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const products = [
    {
      name: "Eggs",
      types: ["Broiler", "KidaKnath", "Nattukoli"],
      img: "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg",
      status: "Available",
    },
    {
      name: "Milk & Products",
      types: ["Cow Milk", "Ghee", "Butter", "Sweets"],
      img: "https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=U5T70bi24itoTDive1CVonJbJ97ChyL2Pz1I2kOoSRo=",
      status: "Available",
    },
    {
      name: "Meat & Chicken",
      types: ["Mutton", "Broiler", "Country", "KidaKnath"],
      img: "https://thumbs.dreamstime.com/b/fresh-chicken-meat-wooden-board-top-view-83865597.jpg",
      status: "Out of Stock",
    },
  ];

  const testimonials = [
    { name: "Ramesh", review: "Fresh products delivered to my home. Best dairy in town!" },
    { name: "Kavya", review: "Eggs and milk are always fresh. Highly recommend!" },
    { name: "Suresh", review: "Pre-ordered meat was delivered on time. Great service!" },
  ];

  const banners = [
    {
      title: "Fresh From Our Farms",
      description: "All products are sourced directly from our farm daily.",
      img: "https://assets.cntraveller.in/photos/60ba23b90f3a5367ec9fe85b/16:9/w_1360,h_765,c_limit/Farm-fresh-produce-1366x768.jpg",
    },
    {
      title: "Fast Delivery",
      description: "Delivery charges depend on distance. Quick and reliable!",
      img: "https://static.vecteezy.com/system/resources/previews/042/665/350/non_2x/fast-delivery-logo-with-courier-vector.jpg",
    },
    {
      title: "Hygienic & Safe",
      description: "All products processed under strict hygiene standards.",
      img: "https://images.squarespace-cdn.com/content/v1/638d8044b6fc77648ebcedba/1736315963026-U88IRCGKBWXBUPHXGQCD/5+Tips+for+Buying+Health+Dairy+Products-f.jpg",
    },
  ];

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-24 px-5 text-center relative">
        <h1 className="text-6xl font-bold mb-6">Milggin Dairy 🥛</h1>
        <p className="text-2xl md:text-3xl mb-10 max-w-2xl mx-auto">
          Fresh Eggs, Milk & Meat delivered from our farms directly to your home.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">

          {/* Shop Now → Order Page */}
          <button
            className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-500 transition"
            onClick={() => navigate("/order")}
          >
            Shop Now
          </button>

          {/* View Products → Products Page */}
          <button
            className="bg-white text-green-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-200 transition"
            onClick={() => navigate("/products")}
          >
            View Products
          </button>

        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-20 px-5 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {products.map((p, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img src={p.img} alt={p.name} className="mx-auto mb-5 rounded-lg" />

              <h3 className="text-2xl font-semibold mb-2 text-center">{p.name}</h3>
              <p className="text-center mb-3">{p.types.join(", ")}</p>

              <p
                className={`text-center mb-4 font-semibold ${
                  p.status === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {p.status}
              </p>

              {/* Pre-Order button → PreOrder page */}
              <button
                className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800 transition"
                onClick={() => navigate("/Contact")}
              >
                Pre-Order
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banners */}
      <section className="py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {banners.map((b, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 text-center"
            >
              <img src={b.img} alt={b.title} className="mx-auto mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2">{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <p className="text-gray-800 mb-4">&quot;{t.review}&quot;</p>
              <h4 className="font-semibold text-lg">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-5 text-center">
        <h2 className="text-4xl font-bold mb-10">Freshness & Delivery</h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          All products are sourced daily from our farms. Delivery charges depend on your location. Pre-order online and get your products at your doorstep.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">

          {/* Pre-Order Now → Preorder */}
          <button
            className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
            onClick={() => navigate("/Contact")}
          >
            Pre-Order Now
          </button>

          <button className="bg-green-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-800 transition">
            Learn More
          </button>

        </div>
      </section>
    </div>
  );
}
