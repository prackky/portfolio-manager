import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import PortfolioPage from './pages/PortfolioPage';
import AddUpdatePage from './pages/AddUpdatePage';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignupPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_KEY } from './firebase'; // Import API_KEY from firebase.js
import { setGlobalLoading } from './services/api'; // Import global loading setter

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token')); // Initialize based on session storage
  const [loading, setLoading] = useState(false); // Global loading state

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const handleUnauthorized = () => {
      console.log('User is unauthenticated');
      sessionStorage.removeItem('token');
      window.location.href = '/signin';
    };

    window.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, []);

  useEffect(() => {
    setGlobalLoading(setLoading); // Pass setLoading to api.js for global usage
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Ensure authentication state persists on refresh
    }
  }, []);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const handleSignIn = (token) => {
    sessionStorage.setItem('token', token); // Use sessionStorage for better token handling
    setIsAuthenticated(true);
    showToast('Signed in successfully!', 'success');
  };

  const handleSignUp = (message, type) => {
    showToast(message, type);
  };

  const handleSignOut = async () => {
    try {
      sessionStorage.removeItem('token'); // Clear token from sessionStorage
      setIsAuthenticated(false);
      showToast('Signed out successfully!', 'info');
    } catch (error) {
      console.error('Error during sign-out:', error);
      showToast('Error during sign-out. Please try again.', 'error');
    }
  };

  const showToast = (message, type) => {
    if (type === 'error') toast.error(message);
    if (type === 'success') toast.success(message);
    if (type === 'info') toast.info(message);
  };

  return (
    <Router>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
        </div>
      )}
      <div className="min-h-screen">
        <nav className="bg-primary dark:bg-gray-800 text-white p-4 shadow-lg sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Portfolio Manager</Link>
            <div className="space-x-6 flex items-center">
              {isAuthenticated ? (
                <>
                  <Link to="/portfolio" className="hover:text-secondary transition-colors">Portfolio</Link>
                  <Link to="/add-update" className="hover:text-secondary transition-colors">Add/Update</Link>
                  <button onClick={handleSignOut} className="focus:outline-none">
                    <FaSignOutAlt size={20} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="hover:text-secondary transition-colors">Sign In</Link>
                  <Link to="/signup" className="hover:text-secondary transition-colors">Sign Up</Link>
                </>
              )}
              <button onClick={toggleDarkMode} className="focus:outline-none">
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={isAuthenticated ? <PortfolioPage /> : <LandingPage />} />
            <Route path="/confirm-account" element={isAuthenticated ? <PortfolioPage /> : <ConfirmAccountPage showToast={showToast}/>} />
            <Route path="/forgot-password" element={<ResetPasswordPage />} />
            <Route path="/signin" element={isAuthenticated ? <PortfolioPage /> : <SignInPage onSignIn={handleSignIn} />} />
            <Route path="/signup" element={isAuthenticated ? <PortfolioPage /> : <SignUpPage onSignUp={handleSignUp} />} />
            <Route
              path="/portfolio"
              element={isAuthenticated ? <PortfolioPage /> : <Navigate to="/signin" />}
            />
            <Route
              path="/add-update"
              element={isAuthenticated ? <AddUpdatePage /> : <Navigate to="/signin" />}
            />
          </Routes>
        </main>
        <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 mt-8">
          <p className="text-gray-600 dark:text-gray-300">© 2025 Portfolio Manager. All rights reserved.</p>
        </footer>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
}

export default App;