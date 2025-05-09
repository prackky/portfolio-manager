import React, { useState, useEffect } from 'react';
import { saveStock } from '../services/api'; // Import the new API function

function StockForm({ onSuccess, initialData = {} }) {
  const [formData, setFormData] = useState({
    id: '',
    transType: '',
    shares: '',
    price: '',
    date: '',
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
      transType: formData.transType,
      shares: formData.shares,
      price: formData.price,
      date: formData.date,
    };

    const response = await saveStock(payload);

    if (response.ok) {
      onSuccess();
      setFormData({ id: '', transType: '', shares: '', price: '', date: '' });
    } else {
      console.error('Failed to save stock:', await response.text());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="Symbol"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <select
        name="transType"
        value={formData.transType}
        onChange={handleChange}
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      >
        <option value="" disabled>Select Transaction Type</option>
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
      </select>
      <input
        type="number"
        name="shares"
        value={formData.shares}
        onChange={handleChange}
        placeholder="Shares"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <button
        type="submit"
        className="bg-secondary text-white p-2 rounded hover:bg-blue-700 transition-colors col-span-2 sm:col-span-1"
      >
        {'Add Stock'}
      </button>
    </form>
  );
}

export default StockForm;