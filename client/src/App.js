import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import PortfolioPage from './pages/PortfolioPage';
import AddUpdatePage from './pages/AddUpdatePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply 'dark' class to <html> based on darkMode state
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-primary dark:bg-gray-800 text-white p-4 shadow-lg sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Portfolio Manager</Link>
            <div className="space-x-6 flex items-center">
              <Link to="/" className="hover:text-secondary transition-colors">Portfolio</Link>
              <Link to="/add-update" className="hover:text-secondary transition-colors">Add/Update</Link>
              <button onClick={toggleDarkMode} className="focus:outline-none">
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/add-update" element={<AddUpdatePage />} />
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