import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';

function ResetPasswordPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('oobCode'); // Firebase reset token
  const auth = getAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        // Reset password using Firebase
        await confirmPasswordReset(auth, token, formData.password);
        setMessage('Password has been reset successfully.');
        setError(null);
        navigate('/signin');
      } else {
        // Send password reset email using Firebase
        await sendPasswordResetEmail(auth, formData.email);
        setMessage('Password reset link sent to your email.');
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{token ? 'Reset Password' : 'Forgot Password'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!token && (
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
          )}
          {token && (
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-secondary text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            {token ? 'Reset Password' : 'Send Link'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
