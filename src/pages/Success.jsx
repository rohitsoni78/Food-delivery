import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-100">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>
      <p className="mt-2 text-gray-600">
        Your food is on the way 🍔🍕
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;