import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard({ onLogout, cart, setCart }) {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await API.get("/sweets/");
      setSweets(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // ✅ Add to Cart
  const addToCart = (sweet) => {
    const existing = cart.find((i) => i.id === sweet.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === sweet.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...sweet, qty: 1 }]);
    }
  };

  // ✅ Filtered list by search
  const filteredSweets = sweets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-600">🍩 SweetShop Dashboard</h2>
        <div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
          <a
            href="/cart"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            🛒 Cart ({cart.length})
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search sweets..."
        className="mb-6 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-pink-300"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSweets.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center hover:shadow-2xl transition"
          >
            <div className="text-5xl mb-3">{s.icon || "🍬"}</div>
            <h3 className="text-xl font-semibold text-gray-700">{s.name}</h3>
            <p className="text-gray-500">Qty: {s.quantity}</p>
            <p className="text-green-600 font-bold text-lg">₹{s.price}</p>
            <button
              disabled={s.quantity === 0}
              onClick={() => addToCart(s)}
              className={`mt-3 px-4 py-2 rounded-lg w-full ${
                s.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white transition"
              }`}
            >
              {s.quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredSweets.length === 0 && !error && (
        <p className="text-gray-500 mt-6 text-center">No sweets found</p>
      )}
    </div>
  );
}

export default Dashboard;
