import React, { useState } from "react";
import API from "../services/api";

function Cart({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    // Validation
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

    try {
      const payload = {
        items: cart,
        total_price: total,
        address: address.trim(),
        phone: phone.trim(),
      };
      await API.post("/orders/", payload);
      alert("Order placed successfully!");
      setCart([]); // empty cart
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.detail
          ? `Failed to place order: ${err.response.data.detail}`
          : "Failed to place order"
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - Qty: {item.qty} - ₹{item.price * item.qty}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ₹{total}</p>

          <input
            type="text"
            placeholder="Address"
            className="block border p-2 my-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="block border p-2 my-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={placeOrder}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
