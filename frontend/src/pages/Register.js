import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register/", formData);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.detail
          ? `❌ Error: ${error.response.data.detail}`
          : "❌ Error in registration"
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
        <p className="text-center text-gray-500 mb-6">Create your account</p>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="username"
              placeholder="👤 Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="🔒 Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 shadow-md transition"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
