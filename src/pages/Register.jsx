import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

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
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
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
