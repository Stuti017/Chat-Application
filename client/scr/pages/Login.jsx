import React, { useEffect, useState } from 'react';
import { BsEmojiExpressionless, BsEmojiLaughing } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, validUser } from '../apis/auth';

const defaultData = {
  email: '',
  password: '',
  userType: '🔵 Student', // Default selection
};

function Login() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const pageRoute = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = '/chats';
      }
    };
    checkUser();
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes('@')) {
      setIsLoading(true);
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem('userToken', data.token);
        toast.success('Successfully Logged In!');
        setIsLoading(false);
        pageRoute('/chats');
      } else {
        setIsLoading(false);
        toast.error('Invalid Credentials!');
        setFormData({ ...formData, password: '' });
      }
    } else {
      setIsLoading(false);
      toast.warning('Provide valid credentials!');
      setFormData(defaultData);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
      <div className="flex w-3/4 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section (Logo) */}
        <div className="w-1/2 bg-gradient-to-b from-blue-600 to-green-500 flex flex-col justify-center items-center p-8">
          <img src="/logo.png" alt="ChatBuddy Logo" />
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Welcome to ChatBuddy!
          </h2>

          {/* User Type Selection */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-1">
              I am a...
            </label>
            <select
              className="w-full p-2 border rounded-md"
              name="userType"
              onChange={handleOnChange}
              value={formData.userType}
            >
              <option>🔵 Student</option>
              <option>🟢 Faculty</option>
              <option>🟡 Senior</option>
            </select>
          </div>

          {/* Email Field */}
          <input
            className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            onChange={handleOnChange}
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              onChange={handleOnChange}
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              required
            />
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {!showPass ? (
                <BsEmojiLaughing className="absolute top-5 right-4 text-gray-600 w-6 h-6" />
              ) : (
                <BsEmojiExpressionless className="absolute top-5 right-4 text-gray-600 w-6 h-6" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <Link className="text-blue-500 text-sm" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            className="w-full mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            type="submit"
            onClick={formSubmit}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '50px', height: '50px' }}
                  loop
                  autoplay
                />
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Registration Link */}
          <div className="mt-4 text-center">
            <a href="/register" className="text-blue-600 hover:underline">
              New user? Register here
            </a>
          </div>

          <p className="text-gray-500 text-xs mt-4 text-center">
            © 2025 ChatBuddy | Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
