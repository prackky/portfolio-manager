import React, { useState } from 'react';

function StockTransactionModal({ stock, onClose, onSave }) {
  const [transactions, setTransactions] = useState(stock.transactions || []); // Initialize with an empty array if null or undefined

  const handleTransactionChange = (index, field, value) => {
    const updatedTransactions = transactions.map((transaction, i) =>
      i === index ? { ...transaction, [field]: value } : transaction
    );
    setTransactions(updatedTransactions);
  };

  const handleSave = () => {
    const updatedStock = { ...stock, transactions };
    onSave(updatedStock);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Transactions</h2>
        {transactions.map((transaction, index) => (
          <div key={transaction.id} className="mb-4 grid grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-200 mb-1">Type</label>
              <input
                type="text"
                value={transaction.type}
                onChange={(e) => handleTransactionChange(index, 'type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-200 mb-1">Shares</label>
              <input
                type="number"
                value={transaction.shares}
                onChange={(e) => handleTransactionChange(index, 'shares', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-200 mb-1">Price</label>
              <input
                type="number"
                value={transaction.price}
                onChange={(e) => handleTransactionChange(index, 'price', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-200 mb-1">Date</label>
              <input
                type="date"
                value={transaction.date}
                onChange={(e) => handleTransactionChange(index, 'date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300 mr-4">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

export default StockTransactionModal;
