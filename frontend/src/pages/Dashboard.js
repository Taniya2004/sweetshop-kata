import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard({ onLogout, cart, setCart, isAdmin }) {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch sweets from backend
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await API.get("/sweets/");
        setSweets(res.data);
        console.log("Fetched sweets:", res.data);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };
    fetchSweets();
  }, []);

  // ✅ Add to Cart function
  const addToCart = (sweet) => {
    console.log("Adding to cart:", sweet);

    const existing = cart.find((item) => item.id === sweet.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === sweet.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...sweet, qty: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-red-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-pink-600">🍬 SweetShop Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
          >
            🛒 Cart ({cart.length})
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
            >
              ⚙️ Admin Panel
            </button>
          )}
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Sweet List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet.id}
            className="bg-white shadow-lg rounded-xl p-5 border border-pink-100 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-pink-700">{sweet.name}</h2>
            <p className="text-gray-600">Category: {sweet.category}</p>
            <p className="font-semibold text-green-600">₹{sweet.price} / 100gm</p>
            <button
              onClick={() => addToCart(sweet)}
              className="mt-3 w-full bg-pink-500 text-white py-2 rounded-lg shadow hover:bg-pink-600"
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
