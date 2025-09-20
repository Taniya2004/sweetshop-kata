import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";

function App() {
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState([]);

  // ✅ Jab app load hoga -> token check karo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public routes */}
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />

        {/* 🏠 Default route handling */}
        {auth ? (
          <>
            <Route
              path="/"
              element={
                <Dashboard
                  onLogout={handleLogout}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
            {/* Agar logged in hai aur /login ya /register pe gaya to dashboard pe bhej do */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {/* Agar login nahi hai to hamesha /login default */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Fallback unknown route */}
        <Route path="*" element={<Navigate to={auth ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
