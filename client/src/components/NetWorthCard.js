import React from 'react';
import { FaCrown } from 'react-icons/fa';

const NetWorthCard = ({ currency, totalValue }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-700 dark:to-gray-500 text-white p-8 rounded-lg shadow-2xl flex items-center justify-center space-x-6 transform transition-transform hover:scale-105">
      <FaCrown className="text-5xl text-yellow-300 animate-pulse" />
      <div>
        <h2 className="text-3xl font-semibold">Net Worth</h2>
        <p className="text-5xl font-bold">{currency}{totalValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default NetWorthCard;
