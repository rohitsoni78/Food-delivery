import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

  const handleSendOTP = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const allUsers = [...users, ...admins];

    const user = allUsers.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      alert("Email not found");
      return;
    }

    const otp = generateOTP();

    // Save OTP temporarily
    localStorage.setItem("resetOTP", otp);
    localStorage.setItem("resetEmail", email);

    alert(`OTP sent: ${otp}`); // 🔥 simulate email

    setStep(2);
  };

  const handleVerifyOTP = () => {
    const storedOTP = localStorage.getItem("resetOTP");

    if (otpInput === storedOTP) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleResetPassword = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let admins = JSON.parse(localStorage.getItem("admins")) || [];

    const email = localStorage.getItem("resetEmail");

    const updatePassword = (arr) =>
      arr.map((u) =>
        u.email === email ? { ...u, password: newPassword } : u
      );

    users = updatePassword(users);
    admins = updatePassword(admins);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("admins", JSON.stringify(admins));

    // cleanup
    localStorage.removeItem("resetOTP");
    localStorage.removeItem("resetEmail");

    alert("Password reset successful!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded w-96 shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 w-full mb-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOTP}
              className="bg-blue-500 text-white w-full py-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border p-2 w-full mb-3 rounded"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />

            <button
              onClick={handleVerifyOTP}
              className="bg-green-500 text-white w-full py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="border p-2 w-full mb-3 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="bg-purple-500 text-white w-full py-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;