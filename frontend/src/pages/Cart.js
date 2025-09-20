import React, { useState } from "react";
import API from "../services/api";

function Cart({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Place Order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your address!");
      return;
    }
    if (!phone.trim()) {
      alert("Please enter your phone number!");
      return;
    }

    const payload = {
      address: address.trim(),
      phone: phone.trim(),
      total_price: total,
      items: cart.map((item) => ({
        sweet_id: item.id,
        quantity: item.qty,
      })),
    };

    console.log("Payload sending:", payload);

    try {
      const res = await API.post("/orders/", payload);
      console.log("✅ Order Placed Response:", res.data);

      alert("✅ Order placed successfully!");
      setCart([]);
      setAddress("");
      setPhone("");
    } catch (error) {
      console.error("Order Error (full):", error);

      if (error.response) {
        console.error("Order Error Response:", error.response.data);
        alert("❌ Failed: " + JSON.stringify(error.response.data));
      } else {
        alert("❌ Failed: " + error.message);
      }
    }
  };

  // ✅ Remove item from cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No items in your cart</p>
        ) : (
          <>
            {/* Items List */}
            <ul className="divide-y divide-pink-100 mb-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.name} (x{item.qty})
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} each → ₹{item.price * item.qty}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Total */}
            <p className="text-right text-xl font-bold text-green-600 mb-6">
              Total: ₹{total}
            </p>

            {/* Address + Phone */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="🏠 Enter delivery address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="📞 Enter phone number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Place Order */}
            <button
              onClick={placeOrder}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 shadow-md transition"
            >
              ✅ Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
