import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10 text-center">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <p>Contact Us: +91 98765 43210 | info@milggindairy.com</p>
        <div className="flex justify-center gap-6 text-xl">
          <a href="https://www.facebook.com/tamildairy" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/tamildairy" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/tamildairy" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
        <p className="text-sm">All Rights Reserved © Milggin Dairy</p>
      </div>
    </footer>
  );
}
