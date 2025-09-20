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
      localStorage.setItem("token", res.data.access);


      if (res.data && res.data.access) {
        localStorage.setItem("token", res.data.access);
        setAuth(true);
        alert("Login successful!");
      } else {
        alert("Login failed! No access token received.");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.detail
          ? `Login failed: ${err.response.data.detail}`
          : "Login failed!"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md transform transition hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-600 animate-bounce">
          🍭 SweetShop
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-300"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
