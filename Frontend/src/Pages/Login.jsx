import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await check_user({ email, password });

    if (result && result.success && result.data && result.data.user) {
      setEmail("");
      setPassword("");
      toast.success("Login Successful");
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast.error(result?.message || "Login failed");
      setLoading(false);
    }
  };

  const check_user = async (user_creds) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_creds)
      });

      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json };
      } else {
        const error_response = await response.json();
        return { success: false, message: error_response.message };
      }
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Toaster />
      <div className="flex flex-col w-full p-9 max-w-md items-center bg-white rounded-2xl mb-10 shadow-md">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-[#216583] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#216583] font-semibold text-lg">Logging in...</p>
          </div>
        ) : (
          <>
            <h2 className='font-bold text-[#216583] text-center text-2xl mb-6'>Welcome Back</h2>
            <input className='border p-3 rounded-lg w-full mb-4 border-[#65C0BA] hover:bg-blue-50 focus:ring focus:ring-[#65C0BA] focus:outline-none shadow-md' type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input className='border p-3 rounded-lg w-full mb-4 border-[#65C0BA] hover:bg-blue-50 focus:ring focus:ring-[#65C0BA] focus:outline-none shadow-md' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button onClick={handleClick} className='cursor-pointer py-2 w-full mb-4 rounded-lg text-white bg-[#65C0BA] hover:bg-[#4aa3a1] font-semibold shadow-md'>Login</button>
            <Link className='text-sm text-[#3d6b82] hover:text-red-600 hover:underline' to="/forgotPassword">Forgot Password?</Link>
            <p className='text-sm text-gray-600'>Don't have an account? <Link className='text-[#3d6b82] font-medium hover:text-[#F76262] ml-1 underline' to="/register">Register</Link></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
