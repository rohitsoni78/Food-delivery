import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { MdClose } from "react-icons/md";

const Login = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const matchUser = (u) =>
      (
        u.email?.toLowerCase() === username.toLowerCase() ||
        u.username?.toLowerCase() === username.toLowerCase()
      ) &&
      u.password === password;

    const foundUser = [...users, ...admins].find(matchUser);

    if (foundUser) {
      localStorage.setItem("user", "true");
      localStorage.setItem("userData", JSON.stringify(foundUser));
      localStorage.setItem(
        "username",
        `${foundUser.firstName} ${foundUser.lastName}`
      );
      localStorage.setItem(
        "role",
        admins.includes(foundUser) ? "admin" : "user"
      );

      setUser(foundUser);
      setShowLogin(false);
      navigate("/dashboard", { replace: true });
    } else {
      alert("Invalid email/username or password");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-xl w-96 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
        >
          <MdClose />
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <input
          type="text"
          placeholder="Email or Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        {/* NEW LINKS */}
        <div className="flex justify-between mt-4 text-sm">
          <span
            onClick={() => {
              setShowLogin(false);
              navigate("/register");
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>

          <span
            onClick={() => {
              setShowLogin(false);
              navigate("/forgot-password");
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;