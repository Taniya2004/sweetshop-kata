import React, { useState } from "react";
import API from "../services/api";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login/", {
        username: username,
        password: password,
      });

      console.log("Login Response:", res.data);

      // ✅ Sirf access token save karo
      localStorage.setItem("token", res.data.access);

      setAuth(true);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200">
  <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md transform transition hover:scale-105">
    <h1 className="text-4xl font-bold text-center mb-6 text-pink-600 animate-bounce">
      🍭 SweetShop
    </h1>
    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

    <input
      type="text"
      placeholder="Username"
      onChange={(e) => setUsername(e.target.value)}
      className="w-full mb-4 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-300"
    />
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      className="w-full mb-4 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-300"
    />
    <button
      onClick={handleLogin}
      className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
    >
      Login
    </button>
  </div>
</div>

  );
}

export default Login;
