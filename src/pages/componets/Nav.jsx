import React, { useContext, useState, useEffect } from "react";
import {
  MdFastfood,
  MdDashboard,
  MdMenu,
  MdClose
} from "react-icons/md";
import {
  IoSearch,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline
} from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav({ setShowLogin }) {

  const { input, setInput, setShowCart, user, setUser } = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.length;

  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  // ✅ AUTO SYNC USER (important)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ✅ LOGIN CHECK
  const isLoggedIn = user || localStorage.getItem("user");

  const userName = localStorage.getItem("username") || "";

  const rawName = userName.split("@")[0].split(" ")[0];
  const firstName =
    rawName.charAt(0).toUpperCase() +
    rawName.slice(1).toLowerCase();

  // ✅ FINAL LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");

    setUser(null);        // 🔥 important
    setOpenMenu(false);

    navigate("/");        // redirect home
  };

  return (
    <div className="w-full bg-slate-100 shadow-md px-4 py-3">

      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <MdFastfood className="text-3xl text-green-500" />
          <span className="font-bold text-xl text-green-600">
            FoodApp
          </span>
        </div>

        {/* SEARCH */}
        <form
          className="hidden md:flex w-[45%] h-12 bg-white items-center px-4 gap-2 rounded-md shadow"
          onSubmit={(e) => e.preventDefault()}
        >
          <IoSearch className="text-green-500" />
          <input
            type="text"
            placeholder="Search Items..."
            className="w-full outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex gap-4 items-center">

          {isLoggedIn && (
            <span className="text-green-600 font-semibold">
              Welcome, {firstName || user?.firstName}
            </span>
          )}

          {isLoggedIn && (
            <MdDashboard
              onClick={() => navigate("/dashboard")}
              className="text-3xl text-green-500 cursor-pointer"
            />
          )}

          {!isLoggedIn && (
            <IoPersonAddOutline
              onClick={() => navigate("/register")}
              className="text-3xl text-green-500 cursor-pointer"
            />
          )}

          {/* ✅ LOGIN / LOGOUT */}
          {isLoggedIn ? (
            <IoLogOutOutline
              onClick={handleLogout}
              className="text-3xl text-red-500 cursor-pointer"
            />
          ) : (
            <IoLogInOutline
              onClick={() => setShowLogin(true)}
              className="text-3xl text-green-500 cursor-pointer"
            />
          )}

          {/* CART */}
          <div
            onClick={() => setShowCart(true)}
            className="relative cursor-pointer"
          >
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
            <LuShoppingBag className="text-3xl text-green-500" />
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          {openMenu ? (
            <MdClose
              className="text-3xl text-green-500 cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
          ) : (
            <MdMenu
              className="text-3xl text-green-500 cursor-pointer"
              onClick={() => setOpenMenu(true)}
            />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow p-4 flex flex-col gap-4">

          <div className="flex items-center gap-2 border p-2 rounded">
            <IoSearch className="text-green-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {!isLoggedIn && (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpenMenu(false);
              }}
              className="flex items-center gap-2 font-semibold text-green-500"
            >
              <IoLogInOutline className="text-xl" />
              Login
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-semibold text-red-500"
            >
              <IoLogOutOutline className="text-xl" />
              Logout
            </button>
          )}

          <button
            onClick={() => {
              setShowCart(true);
              setOpenMenu(false);
            }}
            className="flex items-center justify-between font-semibold"
          >
            <LuShoppingBag className="text-2xl text-green-500" />
            {cartCount > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;