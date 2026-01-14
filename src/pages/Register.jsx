import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   await API.post("/api/auth/register", form);
    await API.post("/api/auth/register", form);
      toast.success("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
  >
    <h2 className="text-3xl font-extrabold text-center text-gray-800">
      Create Account
    </h2>
    <p className="text-center text-gray-500 text-sm">
      Register to manage restaurant reservations
    </p>

    {/* Name */}
    <input
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg "
      placeholder="Full Name"
      required
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    {/* Email */}
    <input
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg "
      placeholder="Email Address"
      type="email"
      required
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    {/* Password */}
    <input
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg "
      placeholder="Password"
      type="password"
      required
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    {/* Role */}
    <select
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white "
      onChange={(e) => setForm({ ...form, role: e.target.value })}
    >
      <option value="customer">Customer</option>
      <option value="admin">Admin</option>
    </select>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-gray-700 text-white py-2.5 rounded-lg font-semibold hover:text-gray-700 hover:bg-gray-400 active:scale-[0.98] transition-all"
    >
      Register
    </button>

    {/* Login link */}
    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <span
        className="text-gray-700 font-medium cursor-pointer hover:underline"
        onClick={() => navigate("/")}
      >
        Login
      </span>
    </p>
  </form>
</div>
  );
};

export default Register;
