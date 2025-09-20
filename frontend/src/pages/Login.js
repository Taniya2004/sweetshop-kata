import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ form submit stop
    try {
      const res = await API.post("/auth/login/", {
        username: username,
        password: password,
      });

      if (res.data && res.data.access) {
        localStorage.setItem("token", res.data.access);
        setAuth(true);
        alert("✅ Login successful!");
        navigate("/"); // dashboard
      } else {
        alert("❌ Login failed! No access token received.");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.detail
          ? `❌ Login failed: ${err.response.data.detail}`
          : "❌ Login failed!"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
          🍭 SweetShop
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* ✅ only form submit */}
        <form onSubmit={handleLogin}>
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
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-600 font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
