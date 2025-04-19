import React, { useState, useEffect } from 'react';
import RealEstateForm from './RealEstateForm';
import RealEstateModal from './RealEstateModal'; // Import the new modal component
import { fetchRealEstates, deleteRealEstate } from '../services/api';

function RealEstateTab() {
  const [realEstates, setRealEstates] = useState([]);
  const [editingRealEstate, setEditingRealEstate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const loadRealEstates = async () => {
    const data = await fetchRealEstates();
    setRealEstates(data);
  };

  useEffect(() => {
    loadRealEstates();
  }, []);

  const handleDelete = async (id) => {
    await deleteRealEstate(id);
    loadRealEstates();
  };

  const handleEdit = (realEstate) => {
    setEditingRealEstate(realEstate);
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async () => {
    setEditingRealEstate(null);
    setIsModalOpen(false); // Close the modal
    loadRealEstates();
  };

  const handleAddSuccess = () => {
    loadRealEstates();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Real Estate</h2>

      {realEstates.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Name</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Property Value</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Purchase Price</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Purchase Date</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Location</th>
                <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {realEstates.map((re) => (
                <tr key={re.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{re.id}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{re.propertyValue}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{re.purchasePrice}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{re.purchaseDate}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{re.location}</td>
                  <td className="py-3 px-6 text-gray-800 dark:text-gray-200">
                    <button onClick={() => handleEdit(re)} className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(re.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mb-6">No real estate assets available.</p>
      )}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Add Real Estate</h3>
      <RealEstateForm onSuccess={handleAddSuccess} />

      {isModalOpen && (
        <RealEstateModal
          realEstate={editingRealEstate}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default RealEstateTab;