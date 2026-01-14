// import { useState } from "react";
// import API from "../api/api";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await API.post("/api/auth/login", form);
//     login(res.data);
//     navigate(res.data.role === "ADMIN" ? "/admin" : "/user");
//   } catch (err) {
//     alert(err.response?.data?.message || "Login failed");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-80 space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">Login</h2>
//         <input
//           className="w-full border p-2 rounded"
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           className="w-full border p-2 rounded"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           Login
//         </button>
//         <p className="text-center text-sm">
//   Don’t have an account?{" "}
//   <span
//     className="text-blue-600 cursor-pointer"
//     onClick={() => navigate("/register")}
//   >
//     Register
//   </span>
// </p>

//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/customer');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      console.error(err);
    }
  };

  const registerLink = () => {
    navigate('/register');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Restaurant Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <button onClick={registerLink} className="text-green-600">Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;