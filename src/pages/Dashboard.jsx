import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MdSearch,
  MdDashboard,
  MdLogout,
  MdShoppingCart,
  MdEdit,
  MdDelete
} from "react-icons/md";

import { RemoveItem } from "../redux/cartSlice";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, setUser } = useContext(UserContext);

  const role = localStorage.getItem("role");
  const cartItems = useSelector((state) => state.cart);

  // ✅ AUTH CHECK
  useEffect(() => {
    if (!user && !localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [user]);

  const firstName = user?.firstName || "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setUser(null);
    navigate("/");
  };

  const handleDelete = (id) => {
    dispatch(RemoveItem(id));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          🍔 FoodApp
        </h1>

        <div className="flex items-center gap-6 text-green-600">

          {user && (
            <span className="font-semibold">
              Welcome, {firstName}
            </span>
          )}

          <MdDashboard className="text-2xl cursor-pointer" />

          <div className="relative cursor-pointer">
            <MdShoppingCart
              onClick={() => navigate("/cart")}
              className="text-2xl"
            />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {user && (
            <MdLogout
              onClick={handleLogout}
              className="text-2xl cursor-pointer hover:text-red-500"
            />
          )}

        </div>
      </div>

      {/* HERO */}
      <div className="bg-green-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold">
          Discover Amazing Food Near You 🍕
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Order your favourite meals instantly
        </p>
      </div>

      {/* CART ITEMS */}
      <div className="px-10 py-12">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Your Added Dishes 🛒
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No dishes added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                {/* ✅ IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">

                  {/* ✅ NAME */}
                  <h3 className="font-semibold">{item.name}</h3>

                  {/* ✅ PRICE */}
                  <p className="text-green-600 font-bold mt-1">
                    ₹{item.price}
                  </p>

                  {/* ✅ QTY */}
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </p>

                  {/* ✅ ADMIN ACTIONS */}
                  {role === "admin" && (
                    <div className="flex gap-3 mt-3">

                      <button
                        onClick={() => navigate(`/edit/${item.id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        <MdEdit /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        <MdDelete /> Delete
                      </button>

                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="text-center py-5 text-gray-500 text-sm">
        Rohit Soni © 2026 FoodApp
      </div>

    </div>
  );
};

export default Dashboard;