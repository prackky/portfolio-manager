import React, { useState, useEffect } from 'react';
import StockForm from './StockForm';
import { fetchStocks, deleteStock, editStock } from '../services/api'; // Import the editStock API
import StockTransactionModal from './StockTransactionModal'; // Import the new modal component

function StockTab() {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetchStocks().then(setStocks);
  }, []);

  const handleDelete = async (id) => {
    await deleteStock(id);
    fetchStocks().then(setStocks);
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async (updatedStock) => {
    await editStock(updatedStock); // Call the edit API
    setEditingStock(null);
    setIsModalOpen(false); // Close the modal
    fetchStocks().then(setStocks);
  };

  const handleAddSuccess = () => {
    fetchStocks().then(setStocks);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Stocks</h2>

      {stocks.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Symbol</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Shares</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Price</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">CMP</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{stock.id}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{stock.shares}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{stock.price}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{stock.cmp}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">
                    <button onClick={() => handleEdit(stock)} className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(stock.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mb-6">No stocks available.</p>
      )}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{'Add Stock'}</h3>
      <StockForm
        onSuccess={handleAddSuccess}
      />

      {isModalOpen && (
        <StockTransactionModal
          stock={editingStock}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default StockTab;