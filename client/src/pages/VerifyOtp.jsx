import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../lib/utils"; // update path if needed
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const VerifyOtpPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const email = state?.email;
  const fullName = state?.fullName;
  const password = state?.password;
  const bio = state?.bio;

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp || !email || !fullName || !password || !bio) {
      toast.error("Missing required info");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/auth/signup", {
        email,
        otp,
        fullName,
        password,
        bio,
      });

      if (res.data.success) {
        toast.success("Account created successfully");

        // ✅ Trigger login and redirect to homepage
        login("login", { email, password }); // assuming this sets token/state
        navigate("/"); // homepage/chat page
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Verification failed");
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 bg-black text-white border rounded"
        />
        <button
          onClick={handleVerify}
          className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded"
        >
          Verify & Create Account
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
