import React, { useState } from 'react';

function FixedIncomeModal({ fixedIncome, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...fixedIncome });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Fixed Income</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            placeholder="Principal"
            className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
          />
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            placeholder="Interest Rate (%)"
            className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
          />
          <input
            type="date"
            name="maturityDate"
            value={formData.maturityDate}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300 mr-4">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

export default FixedIncomeModal;
