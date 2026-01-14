import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

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
      toast.success('Login successful');
      navigate(user.role === 'admin' ? '/admin' : '/customer');
    } catch (err) {
      toast.error('Login failed: ' + (err.response?.data?.msg || ''));
      setError(err.response?.data?.msg || 'Login failed');
      console.error(err);
    }
  };

  const registerLink = () => {
    navigate('/register');
  }

  return (
   <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
  <div className="bg-gray-600 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md ">
    
    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
      Restaurant Login
    </h2>
    <p className="text-center text-gray-50 mb-6">
      Welcome back! Please sign in to continue
    </p>

    {error && (
      <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5 ">
      <div>
        <label className="block text-sm font-medium text-gray-50 mb-1">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 border border-white rounded-lg focus:outline-none text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-50 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border border-white rounded-lg focus:outline-none text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-300 text-black py-2.5 rounded-lg font-semibold hover:bg-gray-700 hover:text-white active:scale-[0.98] transition-all"
      >
        Login
      </button>
    </form>

    <div className="mt-6 text-center text-sm text-gray-50">
      Don’t have an account?
      <button
        onClick={registerLink}
        className="ml-1 text-black font-medium hover:underline"
      >
        Register
      </button>
    </div>
  </div>
</div>

  );
};

export default Login;