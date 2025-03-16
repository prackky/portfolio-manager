import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import PortfolioPage from './pages/PortfolioPage';
import AddUpdatePage from './pages/AddUpdatePage';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignupPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simple auth state

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const handleSignIn = (token) => {
    localStorage.setItem('token', token); // Mock storage
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
            <Route path="/signup" element={<SignUpPage onSignIn={handleSignIn} />} />
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
      </div>
    </Router>
  );
}

export default App;