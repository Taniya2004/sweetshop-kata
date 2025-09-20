import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-pink-500 to-yellow-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
          🍬 SweetShop
        </Link>

        {/* Links */}
        <div className="flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-yellow-200">🏠 Home</Link>
          <Link to="/login" className="hover:text-yellow-200">🔑 Login</Link>
          <Link to="/register" className="hover:text-yellow-200">📝 Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
