import React from "react";
import { useNavigate } from "react-router-dom";


export default function Farm() {
  const navigate = useNavigate();
  
  const videos = [
    { title: "Cow Milking Process", url: "https://www.youtube.com/embed/VIDEO1" },
    { title: "Egg Collection", url: "https://www.youtube.com/embed/VIDEO2" },
    { title: "Mutton Packaging", url: "https://www.youtube.com/embed/VIDEO3" },
    { title: "Butter & Ghee Preparation", url: "https://www.youtube.com/embed/VIDEO4" },
    { title: "Farm Tour", url: "https://www.youtube.com/embed/VIDEO5" },
    { title: "Daily Milking Routine", url: "https://www.youtube.com/embed/VIDEO6" },
  ];

  const images = [
    { title: "Healthy Cows", img: "https://images.squarespace-cdn.com/content/v1/623b572ac9761d2608d13053/397699b6-fdbb-4d28-96a5-7526b8d9ef64/Cow_female_black_white.jpg" },
    { title: "Chickens", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTbT_NKywyRhvN06X75YIiibZ0Jk9xxPXYVg&s" },
    { title: "Farm Field", img: "https://www.shutterstock.com/image-photo/lush-rows-soybeans-thriving-agricultural-600nw-2538313861.jpg" },
    { title: "Packaging", img: "https://www.shutterstock.com/image-photo/caucasian-man-gray-tshirt-holding-260nw-2377570863.jpg" },
    { title: "Milk Bottling", img: "https://c8.alamy.com/comp/CW4T1A/bottling-milk-1-gallon-containers-CW4T1A.jpg" },
    { title: "Sweets Preparation", img: "https://thumbs.dreamstime.com/b/indian-sweets-mithai-27649730.jpg" },
  ];

  const farmInfo = [
    {
      title: "Hygienic Process",
      description:
        "All products are prepared under strict hygiene standards ensuring freshness and safety for every family.",
    },
    {
      title: "Farm to Table",
      description:
        "Products are sourced directly from our farm and delivered to your home with care and precision.",
    },
    {
      title: "Animal Care",
      description:
        "Our cows and chickens are treated with love and care, ensuring healthy and fresh produce.",
    },
  ];

  const testimonials = [
    {
      name: "Ramesh",
      review: "Visited the farm and it was amazing! Very clean and hygienic.",
    },
    {
      name: "Kavya",
      review: "Loved seeing the milking and egg collection process in person.",
    },
    {
      name: "Suresh",
      review: "The farm tour gave me confidence in the products I buy daily.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-green-700 text-white text-center py-24 px-5">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Farm 🐄</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Experience the freshness and hygiene of our Tamil Dairy products directly from our farms.
        </p>
        <button
            className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
            onClick={() => navigate("/Contact")}
          >
            Pre-Order Now
          </button>
      </section>

      {/* Video Gallery */}
      <section className="py-20 px-5 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Farm Production Videos</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {videos.map((video, i) => (
            <div key={i} className="shadow-lg rounded-xl overflow-hidden">
              <iframe
                className="w-full h-64 md:h-72"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <h3 className="text-xl font-semibold p-4 text-center">{video.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-12">Farm Image Gallery</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img src={img.img} alt={img.title} className="w-full h-56 object-cover" />
              <h3 className="p-4 text-center font-semibold">{img.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-5 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Farm Process & Info</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {farmInfo.map((info, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-2xl font-semibold mb-3">{info.title}</h3>
              <p>{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-12">Visitor Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <p className="text-gray-800 mb-4">&quot;{t.review}&quot;</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-5 text-center">
        <h2 className="text-3xl font-bold mb-6">Want Fresh Products from Our Farm?</h2>
        <p className="max-w-xl mx-auto mb-6">
          Pre-order directly online and get fresh Eggs, Milk, and Meat delivered from our farms to your doorstep.
        </p>
        
        <button
            className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
            onClick={() => navigate("/Contact")}
          >
            Pre-Order Now
          </button>
        
      </section>

    
    </div>
  );
}
