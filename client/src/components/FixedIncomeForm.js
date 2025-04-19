import React, { useState, useEffect } from 'react';
import { addFixedIncome } from '../services/api';

function FixedIncomeForm({ onSuccess, initialData = {} }) {
  const [formData, setFormData] = useState({
    id: '',
    principal: '',
    interestRate: '',
    startDate: '',
    maturityDate: '',
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
    // console.log('Updated formData:', { ...formData, [name]: value }); // Debug log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id,
      principal: formData.principal,
      interestRate: formData.interestRate,
      startDate: formData.startDate,
      maturityDate: formData.maturityDate,
    };

    const response = await addFixedIncome(payload);

    if (response.ok) {
      onSuccess();
      setFormData({ id: '', principal: '', interestRate: '', startDate: '', maturityDate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="Fixed Income ID"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="number"
        name="principal"
        value={formData.principal}
        onChange={handleChange}
        placeholder="Principal"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="number"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleChange}
        placeholder="Interest Rate (%)"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="date"
        name="maturityDate"
        value={formData.maturityDate}
        onChange={handleChange}
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <button
        type="submit"
        className="bg-secondary text-white p-2 rounded hover:bg-blue-700 transition-colors col-span-2 sm:col-span-1"
      >
        {'Add Fixed Income'}
      </button>
    </form>
  );
}

export default FixedIncomeForm;