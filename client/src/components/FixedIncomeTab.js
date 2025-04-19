import React, { useState, useEffect } from 'react';
import FixedIncomeForm from './FixedIncomeForm';
import FixedIncomeModal from './FixedIncomeModal'; // Import the new modal component
import { getFixedIncomes, deleteFixedIncome, updateFixedIncome } from '../services/api';

function FixedIncomeTab() {
  const [fixedIncomes, setFixedIncomes] = useState([]);
  const [editingFixedIncome, setEditingFixedIncome] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const fetchFixedIncomes = async () => {
    const data = await getFixedIncomes();
    setFixedIncomes(data);
  };

  useEffect(() => {
    fetchFixedIncomes();
  }, []);

  const handleDelete = async (id) => {
    await deleteFixedIncome(id);
    fetchFixedIncomes();
  };

  const handleEdit = (fixedIncome) => {
    setEditingFixedIncome(fixedIncome);
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async (updatedFixedIncome) => {
    await updateFixedIncome(updatedFixedIncome.id, updatedFixedIncome); // Call the update API
    setEditingFixedIncome(null);
    setIsModalOpen(false); // Close the modal
    fetchFixedIncomes();
  };

  const handleAddSuccess = () => {
    fetchFixedIncomes();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Fixed Income</h2>

      {fixedIncomes.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">ID</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Principal</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Interest Rate</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Start Date</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Maturity Date</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fixedIncomes.map((fi) => (
                <tr key={fi.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{fi.id}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{fi.principal}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{fi.interestRate}%</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{fi.startDate}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{fi.maturityDate}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">
                    <button onClick={() => handleEdit(fi)} className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(fi.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mb-6">No fixed income assets available.</p>
      )}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Add Fixed Income</h3>
      <FixedIncomeForm onSuccess={handleAddSuccess} />

      {isModalOpen && (
        <FixedIncomeModal
          fixedIncome={editingFixedIncome}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default FixedIncomeTab;