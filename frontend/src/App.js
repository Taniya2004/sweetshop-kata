import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";

function App() {
  const [auth, setAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ new

  // ✅ Jab app load hoga -> token & isAdmin check karo
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    console.log("🔑 App mounted, token:", token);
    if (token) {
      setAuth(true);
      setIsAdmin(adminFlag);
    }
    setLoading(false); // ✅ auth check complete
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
      <Routes>
        {/* 🔓 Public routes */}
        <Route
          path="/login"
          element={<Login setAuth={setAuth} setIsAdmin={setIsAdmin} />}
        />
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
                  isAdmin={isAdmin}
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
        <Route
          path="*"
          element={<Navigate to={auth ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
