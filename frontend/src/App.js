import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Home from "./pages/Home"; // ✅ new Home page

function App() {
  const [auth, setAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    if (token) {
      setAuth(true);
      setIsAdmin(adminFlag);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setAuth(false);
    setIsAdmin(false);
  };

  if (loading) return <div className="p-10 text-center">⏳ Checking session...</div>;

  return (
    <BrowserRouter>
      <Navbar auth={auth} onLogout={handleLogout} />
      <Routes>
        {/* ✅ Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={auth ? <Navigate to="/dashboard" replace /> : <Login setAuth={setAuth} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={auth ? <Navigate to="/dashboard" replace /> : <Register />} />

        {/* ✅ Protected pages */}
        {auth ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  onLogout={handleLogout}
                  cart={cart}
                  setCart={setCart}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          </>
        ) : (
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
        )}

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
