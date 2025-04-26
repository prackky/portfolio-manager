import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../firebase'; // Import the initialized Firebase app
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

function SignInPage({ onSignIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app); // Use the initialized app

  useEffect(() => {
    setFormData({ email: '', password: '' }); // Clear fields on page load
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      onSignIn(token); // Assuming token-based auth
      navigate('/portfolio');
    } catch (err) {
      setError('Sign-in failed. ' + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const response = await fetch('/api/google-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        onSignIn(data.token); // Assuming token-based auth
        navigate('/portfolio');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-secondary text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 p-2 rounded hover:bg-gray-100 transition-colors mt-4 shadow-sm"
        >
          <FcGoogle className="mr-2 text-xl" /> {/* Add Google icon */}
          Sign In with Google
        </button>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don’t have an account? <Link to="/signup" className="text-secondary hover:underline">Sign Up</Link>
          <span className="mx-2">|</span> {/* Add vertical line */}
          <Link to="/forgot-password" className="text-secondary hover:underline">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;