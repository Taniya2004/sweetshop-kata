import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart"

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [cart, setCart] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setAuth(false);                  
  };

  return (
    <BrowserRouter>
      <Routes>
        {!auth ? (
          <Route path="/" element={<Login setAuth={setAuth} />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard onLogout={() => setAuth(false)} cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />        
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;