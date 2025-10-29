import React, { useEffect, useState } from 'react';
import { BsEmojiExpressionless, BsEmojiLaughing } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, validUser } from '../apis/auth';
const defaultData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  accountType: 'Student',
};

function Register() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const pageRoute = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email validation with regex: numbers@daiict.ac.in
  const emailRegex = /^[0-9]+@daiict\.ac\.in$/;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email format
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid DAIICT email');
      setIsLoading(false);
      return;
    }

    const { data } = await registerUser(formData);
    if (!data.error) {
      localStorage.setItem('userToken', data.token);
      toast.success('Successfully Registered! 😍');
      setIsLoading(false);
      pageRoute('/chats');
    } else {
      toast.error('Email already registered!');
      setIsLoading(false);
      pageRoute('/register');
    }
  };

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = '/chats';
      }
    };
    isValid();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
      <div className="flex w-3/4 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side (Logo and Gradient background) */}
        <div className="w-1/2 bg-gradient-to-b from-blue-600 to-green-500 flex flex-col justify-center items-center p-8">
          <img src="/logo.png" alt="ChatBuddy Logo" />
        </div>

        {/* Right side (Form) */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Create Your Account
          </h2>

          {/* Account Type Selection */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-1">
              I am a...
            </label>
            <select
              className="w-full p-2 border rounded-md"
              name="accountType"
              value={formData.accountType}
              onChange={handleOnChange}
            >
              <option value="Student">🔵 Student</option>
              <option value="Alumni">🟢 Alumni</option>
              <option value="Professor">🟡 Professor</option>
            </select>
          </div>

          {/* Name Inputs */}
          <div className="flex gap-x-2 w-full mt-4">
            <input
              onChange={handleOnChange}
              className="bg-gray-200 h-12 px-3 w-1/2 text-black rounded-md"
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              required
            />
            <input
              onChange={handleOnChange}
              className="bg-gray-200 h-12 px-3 w-1/2 text-black rounded-md"
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              required
            />
          </div>

          {/* Email Input */}
          <input
            onChange={handleOnChange}
            className="bg-gray-200 h-12 px-3 w-full mt-4 text-black rounded-md"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            required
          />

          {/* Password Input */}
          <div className="relative mt-3">
            <input
              onChange={handleOnChange}
              className="bg-gray-200 h-12 px-3 w-full text-black rounded-md"
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3 right-4"
            >
              {!showPass ? (
                <BsEmojiLaughing className="text-gray-600 w-6 h-6" />
              ) : (
                <BsEmojiExpressionless className="text-gray-600 w-6 h-6" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          {/* Register Button */}
          <button
            style={{
              background:
                'linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)',
            }}
            className="w-full mt-4 h-12 font-bold text-[#121418] text-lg rounded-md"
            type="submit"
            onClick={handleOnSubmit}
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
              'Register'
            )}
          </button>

          {/* Sign In Link */}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-xs mt-4 text-center">
            © 2025 ChatBuddy | Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
