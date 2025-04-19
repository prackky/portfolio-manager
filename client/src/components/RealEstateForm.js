import React, { useState, useEffect } from 'react';
import { addRealEstate, updateRealEstate } from '../services/api';

function RealEstateForm({ onSuccess, initialData = {} }) {
  const [formData, setFormData] = useState({
    id: '',
    propertyValue: '',
    purchasePrice: '',
    purchaseDate: '',
    location: '',
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
      propertyValue: formData.propertyValue,
      purchasePrice: formData.purchasePrice,
      purchaseDate: formData.purchaseDate,
      location: formData.location,
    };

    const response = await addRealEstate(payload);

    if (response.ok) {
      onSuccess();
      setFormData({ name: '', propertyValue: '', purchasePrice: '', purchaseDate: '', location: '' });
    }
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
        name="propertyValue"
        value={formData.propertyValue}
        onChange={handleChange}
        placeholder="Property Value"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="number"
        name="purchasePrice"
        value={formData.purchasePrice}
        onChange={handleChange}
        placeholder="Purchase Price"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="date"
        name="purchaseDate"
        value={formData.purchaseDate}
        onChange={handleChange}
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <button
        type="submit"
        className="bg-secondary text-white p-2 rounded hover:bg-blue-700 transition-colors col-span-2 sm:col-span-1"
      >
        {'Add Real Estate'}
      </button>
    </form>
  );
}

export default RealEstateForm;