import React, { useState, useEffect } from 'react';
import MutualFundForm from './MutualFundForm';
import { getMutualFunds, deleteMutualFund, updateMutualFund } from '../services/api'; // Import the editMutualFund API
import MfTransactionModal from './MutualFundTransactionModal'; // Import the new modal component

function MutualFundTab() {
  const [mfs, setMfs] = useState([]);
  const [editingMutualFund, setEditingMutualFund] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    getMutualFunds().then(setMfs);
  }, []);

  const handleDelete = async (id) => {
    await deleteMutualFund(id);
    getMutualFunds().then(setMfs);
  };

  const handleEdit = (mf) => {
    setEditingMutualFund(mf);
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async (updatedMutualFund) => {
    await updateMutualFund(updatedMutualFund); // Call the edit API
    setEditingMutualFund(null);
    setIsModalOpen(false); // Close the modal
    getMutualFunds().then(setMfs);
  };

  const handleAddSuccess = () => {
    getMutualFunds().then(setMfs);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Mutual Funds</h2>

      {mfs.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Symbol</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Units</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Price</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">CMP</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mfs.map((mf) => (
                <tr key={mf.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{mf.id}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{mf.units}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{mf.price}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{mf.cmp}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">
                    <button onClick={() => handleEdit(mf)} className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(mf.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mb-6">No MFs available.</p>
      )}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{'Add MutualFund'}</h3>
      <MutualFundForm
        onSuccess={handleAddSuccess}
      />

      {isModalOpen && (
        <MfTransactionModal
          mf={editingMutualFund}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default MutualFundTab;