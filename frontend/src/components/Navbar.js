import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img.jpg";
import brandImage from "../assets/img1.jpg"; // NEW IMAGE

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isShopOwner, setIsShopOwner] = useState(false);

  const navigate = useNavigate();

  // -------- LOGIN STATE --------
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      setIsLoggedIn(!!token);

      if (user) {
        const userObj = JSON.parse(user);
        setIsAdmin(userObj.role === "admin");
        setIsShopOwner(userObj.role === "shop_owner");
      } else {
        setIsAdmin(false);
        setIsShopOwner(false);
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // -------- SCROLL EFFECT --------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsShopOwner(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl" : ""
      } bg-gradient-to-r from-green-900 via-green-800 to-green-900`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">

          {/* BRAND IMAGE ONLY */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 rounded-full object-cover border-2 border-yellow-400 shadow-md"
            />
            <img
              src={brandImage}
              alt="Tamil Dairy"
              className="h-12 object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-10 items-center font-semibold text-white">

            {isAdmin && (
              <Link to="/admin" className="hover:text-yellow-300 text-lg">
                Admin Dashboard
              </Link>
            )}

            {isShopOwner && (
              <Link to="/accept-orders" className="hover:text-yellow-300 text-lg">
                Accept Orders
              </Link>
            )}

            {!isAdmin && !isShopOwner && (
              <>
                {["Home", "Products", "Farm", "Branches", "Contact"].map(link => (
                  <Link
                    key={link}
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="hover:text-yellow-300 text-lg"
                  >
                    {link}
                  </Link>
                ))}

                <Link
                  to="/order"
                  className="bg-yellow-400 text-green-900 px-5 py-2 rounded-lg font-bold shadow hover:bg-yellow-500"
                >
                  Order
                </Link>
              </>
            )}

            {/* AUTH */}
            {localStorage.getItem("token") ? (
              <button
                onClick={handleLogout}
                className="hover:text-yellow-300 text-lg"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-yellow-300 text-lg">
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-green-800 px-4 py-4 space-y-2 text-white">

            {!isAdmin && !isShopOwner && (
              <>
                {["Home", "Products", "Farm", "Branches", "Contact"].map(link => (
                  <Link
                    key={link}
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block py-2"
                  >
                    {link}
                  </Link>
                ))}

                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 bg-yellow-400 text-green-900 rounded font-bold"
                >
                  Order
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
