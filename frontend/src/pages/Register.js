import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register/", formData);
      alert("Registration successful! Please login.");
      navigate("/login"); // ✅ register ke baad login pe bhej do
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.detail
          ? `Error: ${error.response.data.detail}`
          : "Error in registration"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
          🍭 SweetShop Register
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
          >
            Register
          </button>
        </form>

        {/* 👇 Login link yaha add kiya */}
        <p className="mt-4 text-center">
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
