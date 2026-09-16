import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const Register = () => {
  const [role, setRole] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // 🔥 NAME VALIDATION
    if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
      alert("Name should contain only letters");
      return;
    }

    // 🔥 PHONE VALIDATION (10 digits)
    if (!/^[0-9]{10}$/.test(number)) {
      alert("Mobile number must be 10 digits");
      return;
    }

    // 🔥 EMAIL VALIDATION
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format");
      return;
    }

    // 🔥 PASSWORD VALIDATION
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // 🔥 CONFIRM PASSWORD
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    const userData = {
      role,
      firstName,
      lastName,
      number,
      email,
      password,
    };

    const key = role === "admin" ? "admins" : "users";
    const existingUsers = JSON.parse(localStorage.getItem(key)) || [];

    const alreadyExists = existingUsers.find(
      (u) => u.email === email
    );

    if (alreadyExists) {
      alert("Account already exists with this email");
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem(key, JSON.stringify(existingUsers));
    localStorage.setItem("username", fullName);
    localStorage.setItem("role", role);

    alert("Registered Successfully");

    navigate("/");
    setTimeout(() => {
      const event = new Event("openLogin");
      window.dispatchEvent(event);
    }, 100);

    setFirstName("");
    setLastName("");
    setNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200 relative">

      <Link
        to="/"
        className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg"
      >
        <IoHomeOutline className="text-green-500 text-2xl" />
      </Link>

      <form
        onSubmit={handleRegister}
        className="w-87.5 bg-white p-6 rounded-xl shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-600">
          {role === "admin" ? "Admin Register" : "User Register"}
        </h2>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-1 rounded ${
              role === "user"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded ${
              role === "admin"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <input type="text" placeholder="First Name" className="border p-2 rounded"
          value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

        <input type="text" placeholder="Last Name" className="border p-2 rounded"
          value={lastName} onChange={(e) => setLastName(e.target.value)} required />

        <input type="tel" placeholder="Mobile Number" className="border p-2 rounded"
          value={number} onChange={(e) => setNumber(e.target.value)} required />

        <input type="email" placeholder="Email" className="border p-2 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="border p-2 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <input type="password" placeholder="Confirm Password" className="border p-2 rounded"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button className="bg-green-500 text-white py-2 rounded font-semibold">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const event = new Event("openLogin");
                window.dispatchEvent(event);
              }, 100);
            }}
            className="text-green-600 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;