import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";   // ✅ ADD KIYA
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"; 
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import { ToastContainer } from "react-toastify";


function App() {

  const [showLogin, setShowLogin] = useState(false);   // ✅ ADD KIYA

  return (
    <BrowserRouter>

      {/* ✅ POPUP YAHI ADD KIYA */}
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <Routes>
        {/* ✅ PROP PASS KIYA */}
        <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;