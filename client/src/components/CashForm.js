import React, { useState, useEffect } from 'react';
import { addCashAsset, updateCashAsset } from '../services/api';

function CashForm({ onSuccess, initialData = {}, isEditing = false }) {
  const [formData, setFormData] = useState({
    id: '',
    amount: '',
    ...initialData,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id,
      amount: formData.amount,
    };

    if (isEditing) {
      await updateCashAsset(formData.id, payload);
    } else {
      await addCashAsset(payload);
    }

    onSuccess();
    setFormData({ id: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="Name"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <button
        type="submit"
        className="bg-secondary text-white p-2 rounded hover:bg-blue-700 transition-colors col-span-2 sm:col-span-1"
      >
        {isEditing ? 'Update Cash' : 'Add Cash'}
      </button>
    </form>
  );
}

export default CashForm;