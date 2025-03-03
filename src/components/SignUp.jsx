// SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate a fetch API call to a mock endpoint for signup
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      // Simulate successful response
      const data = await response.json();
      console.log('Simulated API response:', data);

      // Check if all fields are filled (simulation)
      if (username && email && password) {
        // Simulate successful signup
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after "signup"
        }, 500); // Small delay to show loading state
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#1A1A2E] py-12 px-6 p-4">
      <div 
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7AA1D2] focus:border-transparent transition-all duration-300"
              placeholder="johndoe"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7AA1D2] focus:border-transparent transition-all duration-300"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7AA1D2] focus:border-transparent transition-all duration-300"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white
              bg-[#7AA1D2] hover:bg-[#6B8BBF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AA1D2]
              transform transition-all duration-300
              ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-[#7AA1D2] hover:text-[#6B8BBF] transition-colors duration-200">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;