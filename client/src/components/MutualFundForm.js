import React, { useState, useEffect, useCallback, useRef } from 'react';
import { addMutualFund, searchMutualFunds } from '../services/api'; // Import the new API function

function MutualFundForm({ onSuccess, initialData = {} }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    transType: '',
    units: '',
    price: '',
    date: '',
    ...initialData,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSchemeName, setSelectedSchemeName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const latestQueryRef = useRef(''); // Track the latest query

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const debounceSearch = useCallback(() => {
    latestQueryRef.current = searchQuery; // Update the latest query
    const handler = setTimeout(async () => {
      if (latestQueryRef.current === searchQuery && searchQuery) {
        const results = await searchMutualFunds(searchQuery);
        setSearchResults(results);
      }
    }, 600); // 600ms debounce delay
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    debounceSearch();
  }, [searchQuery, debounceSearch]);

  const handleSchemeSelect = (scheme) => {
    setFormData((prevData) => ({
      ...prevData,
      id: scheme.schemeCode,
      name: scheme.schemeName,
    }));
    setSelectedSchemeName(scheme.schemeName);
    setSearchResults([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') {
      setSelectedSchemeName(value);
      setSearchQuery(value); // Update the search query
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id,
      name: selectedSchemeName,
      transType: formData.transType,
      units: formData.units,
      price: formData.price,
      date: formData.date,
    };

    const response = await addMutualFund(payload);

    if (response.ok) {
      onSuccess();
      setFormData({ id: '', name: '', transType: '', units: '', price: '', date: '' });
      setSelectedSchemeName('');
    } else {
      console.error('Failed to save mf:', await response.text());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="relative">
        <input
          type="text"
          name="id"
          value={selectedSchemeName}
          onChange={handleChange}
          placeholder="Symbol"
          required
          className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200 w-full"
        />
        {searchResults.length > 0 && (
          <ul className="absolute bg-white border rounded shadow-lg max-h-40 overflow-y-auto z-10 w-full">
            {searchResults.map((scheme) => (
              <li
                key={scheme.schemeCode}
                onClick={() => handleSchemeSelect(scheme)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {scheme.schemeName}
              </li>
            ))}
          </ul>
        )}
      </div>
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
        name="units"
        value={formData.units}
        onChange={handleChange}
        placeholder="Units"
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
        {'Add MF'}
      </button>
    </form>
  );
}

export default MutualFundForm;