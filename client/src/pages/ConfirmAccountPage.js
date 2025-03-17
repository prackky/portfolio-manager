import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ConfirmAccountPage({ showToast }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await fetch('/api/confirm-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        });
        if (response.ok) {
          setLoading(true);
          setTimeout(() => {
            showToast(data.message, 'success');
            navigate('/signin');
          }, 5000);
        } else {
          const data = await response.json();
          setError(data.error);
          showToast(data.error, 'error');
        }
      } catch (err) {
        setError('Account confirmation failed. Please try again.');
      }
    };

    confirmAccount();
  }, [token, email, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Confirm Account</h2>
        {loading ? (
          <p className="text-blue-500">Verifying...</p>
        ) : (
          error && <p className="text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}

export default ConfirmAccountPage;
