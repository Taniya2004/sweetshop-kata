import React, { useEffect, useState } from "react";
import { searchSweets } from "../services/api";
import API from "../services/api";

function Dashboard({ onLogout, cart, setCart, isAdmin }) {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Filters state
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    price_min: "",
    price_max: "",
  });

  // ✅ Add Sweet form (admin only)
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // ✅ Edit Sweet state
  const [editingId, setEditingId] = useState(null);
  const [editSweet, setEditSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // ✅ Fetch sweets
  const handleSearch = async () => {
    try {
      const res = await searchSweets(filters);
      setSweets(res.data);
      setError(null);
    } catch (err) {
      console.error("❌ Search Error:", err.response?.data || err.message);
      setError("Failed to load sweets");
    }
  };

  useEffect(() => {
    handleSearch();
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

  // ✅ Admin: Add Sweet
  const handleAddSweet = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/sweets/", newSweet);
      const addedSweet = res.data;
      
      setNewSweet({ name: "", category: "", price: "", quantity: "" });
      setFilters({ name: "", category: "", price_min: "", price_max: "" });
      
      alert("✅ Sweet added successfully!");
      handleSearch();
    } catch (err) {
      console.error("❌ Add Sweet Error:", err.response?.data || err.message);
      alert("Failed to add sweet");
    }
  };

  // ✅ Admin: Delete Sweet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await API.delete(`/sweets/${id}/`);
      alert("🗑️ Sweet deleted!");
      handleSearch();
    } catch (err) {
      console.error("❌ Delete Error:", err.response?.data || err.message);
      alert("Failed to delete sweet");
    }
  };

  // ✅ Admin: Start Edit
  const startEdit = (sweet) => {
    setEditingId(sweet.id);
    setEditSweet({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  // ✅ Admin: Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditSweet({ name: "", category: "", price: "", quantity: "" });
  };

  // ✅ Admin: Save Edit
  const handleUpdate = async (id) => {
    try {
      const res = await API.put(`/sweets/${id}/`, editSweet);
      alert("✏️ Sweet updated!");
      setEditingId(null);

      // update local state immediately
      setSweets(sweets.map((s) => (s.id === id ? res.data : s)));
    } catch (err) {
      console.error("❌ Update Error:", err.response?.data || err.message);
      alert("Failed to update sweet");
    }
  };

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

      {/* 🔍 Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={filters.price_min}
          onChange={(e) => setFilters({ ...filters, price_min: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.price_max}
          onChange={(e) => setFilters({ ...filters, price_max: e.target.value })}
          className="px-3 py-2 border rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 mb-6"
      >
        Search
      </button>

      {/* ✅ Admin: Add Sweet Form */}
      {isAdmin && (
        <form
          onSubmit={handleAddSweet}
          className="bg-white p-6 rounded-lg shadow mb-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-pink-600">➕ Add New Sweet</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={newSweet.name}
              onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newSweet.category}
              onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newSweet.price}
              onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newSweet.quantity}
              onChange={(e) =>
                setNewSweet({ ...newSweet, quantity: e.target.value })
              }
              className="px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Add Sweet
          </button>
        </form>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sweets.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center hover:shadow-2xl transition"
          >
            <div className="text-5xl mb-3">{s.icon || "🍬"}</div>

            {editingId === s.id ? (
              <>
                {/* Edit Mode */}
                <input
                  type="text"
                  value={editSweet.name}
                  onChange={(e) => setEditSweet({ ...editSweet, name: e.target.value })}
                  className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                  type="text"
                  value={editSweet.category}
                  onChange={(e) => setEditSweet({ ...editSweet, category: e.target.value })}
                  className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                  type="number"
                  value={editSweet.price}
                  onChange={(e) => setEditSweet({ ...editSweet, price: e.target.value })}
                  className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                  type="number"
                  value={editSweet.quantity}
                  onChange={(e) =>
                    setEditSweet({ ...editSweet, quantity: e.target.value })
                  }
                  className="mb-2 px-2 py-1 border rounded w-full"
                />

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleUpdate(s.id)}
                    className="flex-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Normal Mode */}
                <h3 className="text-xl font-semibold text-gray-700">{s.name}</h3>
                <p className="text-gray-500">Category: {s.category}</p>
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

                {/* ✅ Admin: Edit & Delete */}
                {isAdmin && (
                  <div className="w-full mt-2 flex gap-2">
                    <button
                      onClick={() => startEdit(s)}
                      className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* No results */}
      {sweets.length === 0 && !error && (
        <p className="text-gray-500 mt-6 text-center">No sweets found</p>
      )}
    </div>
  );
}

export default Dashboard;
