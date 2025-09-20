import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

function Login({ setAuth, setIsAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🚀 Login button clicked");

    try {
      const res = await API.post("/auth/login/", { username, password });

      if (res.data && res.data.access) {
        // ✅ Save token
        localStorage.setItem("token", res.data.access);
        console.log("Login response:", res.data);

        // ✅ Decode token
        let isAdmin = false;
        try {
          const decoded = jwtDecode(res.data.access);
          isAdmin = decoded.is_admin || false;
          console.log("Decoded token:", decoded);
        } catch (err) {
          console.error("JWT Decode Error:", err);
        }

        // ✅ Save admin flag
        localStorage.setItem("isAdmin", isAdmin);
        setIsAdmin(isAdmin);

        // ✅ Set Auth
        setAuth(true);

        alert("✅ Login successful!");
        navigate("/");
      } else {
        alert("❌ Login failed! No token.");
      }
    } catch (err) {
      console.error("Login Error (full):", err);
      console.error("Login Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.detail
          ? `❌ Login failed: ${err.response.data.detail}`
          : "❌ Login failed!"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-pink-100">
        {/* Branding */}
        <h1 className="text-4xl font-extrabold text-center mb-2 text-pink-600 drop-shadow-sm">
          🍩 SweetShop 🍬
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please login
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="👤 Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-pink-600 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
