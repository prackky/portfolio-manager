import React, { useState, useEffect } from 'react';
import CashForm from './CashForm';
import { fetchCashAssets, deleteCashAsset } from '../services/api';

function CashTab() {
  const [cashAssets, setCashAssets] = useState([]);
  const [editingCash, setEditingCash] = useState(null);

  const fetchCashAssetsData = async () => {
    const data = await fetchCashAssets();
    setCashAssets(data);
  };

  useEffect(() => {
    fetchCashAssetsData();
  }, []);

  const handleDelete = async (id) => {
    await deleteCashAsset(id);
    fetchCashAssetsData();
  };

  const handleEdit = (cash) => {
    setEditingCash(cash);
  };

  const handleUpdate = async (updatedCash) => {
    setEditingCash(null);
    fetchCashAssetsData();
  };

  const handleAddSuccess = () => {
    fetchCashAssetsData();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Cash</h2>

      {cashAssets.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Name</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Amount</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cashAssets.map((cash) => (
                <tr key={cash.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{cash.id}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{cash.amount}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">
                    <button onClick={() => handleEdit(cash)} className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(cash.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mb-6">No cash assets available.</p>
      )}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{editingCash ? 'Edit Cash' : 'Add Cash'}</h3>
      <CashForm
        initialData={editingCash}
        onSuccess={editingCash ? handleUpdate : handleAddSuccess}
        isEditing={!!editingCash}
      />
    </div>
  );
}

export default CashTab;