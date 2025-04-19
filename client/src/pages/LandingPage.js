import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaCrown, FaLock } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <div className="text-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-secondary">Portfolio Manager</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Take control of your investments with a sleek, powerful tool designed to track and grow your wealth.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-6 py-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <FaChartPie className="text-4xl text-accent mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Visual Insights</h3>
          <p>Track your portfolio with intuitive pie charts and blocks.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <FaCrown className="text-4xl text-yellow-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Premium Net Worth</h3>
          <p>See your total wealth in an intuitive, easy-to-read display.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <FaLock className="text-4xl text-secondary mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
          <p>Manage your assets with confidence using secure authentication.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;