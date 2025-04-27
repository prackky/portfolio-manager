const API_BASE_URL = '/api/assets';

let globalSetLoading = null;

export const setGlobalLoading = (setLoading) => {
  globalSetLoading = setLoading;
};

const handleUnauthorized = () => {
  // Notify the app about unauthorized status
  window.dispatchEvent(new Event('unauthorized'));
};

const handleRequest = async (url, options) => {
  try {
    if (globalSetLoading) globalSetLoading(true); // Enable global loading
    const response = await fetch(url, options);
    if (response.status === 401) handleUnauthorized();
    return response;
  } finally {
    if (globalSetLoading) globalSetLoading(false); // Disable global loading
  }
};

// Fetch all assets
export const fetchAssets = async () => {
  const response = await handleRequest(API_BASE_URL, {
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
  return response.json();
};

// Add a new cash asset
export const addCashAsset = async (payload) => {
  const response = await handleRequest('/api/add_cash_asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

// Fetch cash assets
export const fetchCashAssets = async () => {
  const response = await handleRequest(`${API_BASE_URL}/Cash`, {
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
  return response.json();
};

// Delete a cash asset by ID
export const deleteCashAsset = async (id) => {
  await handleRequest(`${API_BASE_URL}/Cash/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
};

// Update a cash asset by ID
export const updateCashAsset = async (id, updatedCash) => {
  await handleRequest(`${API_BASE_URL}/Cash/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(updatedCash),
  });
};

// Add a new fixed income asset
export const addFixedIncome = async (payload) => {
  const response = await handleRequest('/api/add_fixed_income', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

// Update a fixed income asset by ID
export const updateFixedIncome = async (id, payload) => {
  const response = await handleRequest(`/api/assets/FixedIncome/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const getFixedIncomes = async () => {
  const response = await handleRequest('/api/assets/FixedIncome', {
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
  const data = await response.json();
  return data;
};

export const deleteFixedIncome = async (id) => {
  await handleRequest(`/api/assets/FixedIncome/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
};

export const addMutualFund = async (payload) => {
  const response = await handleRequest('/api/add_mutual_fund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const updateMutualFund = async (payload) => {
  const response = await handleRequest(`/api/assets/MutualFund/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const getMutualFunds = async () => {
  const response = await handleRequest('/api/assets/MutualFund', {
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
  const data = await response.json();
  return data;
};

export const deleteMutualFund = async (id) => {
  await handleRequest(`/api/assets/MutualFund/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
};

export const addRealEstate = async (payload) => {
  const response = await handleRequest('/api/add_real_estate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const updateRealEstate = async (id, payload) => {
  const response = await handleRequest(`/api/assets/RealEstate/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const fetchRealEstates = async () => {
  const response = await handleRequest('/api/assets/RealEstate', {
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
  const data = await response.json();
  return data;
};

export const deleteRealEstate = async (id) => {
  await handleRequest(`/api/assets/RealEstate/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
};

export const saveStock = async (payload) => {
  const url = '/api/add_stock';
  const method = 'POST';

  const response = await handleRequest(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const editStock = async (payload) => {
  const url = `/api/assets/Stock/${payload.id}`;
  const method = 'PUT';

  const response = await handleRequest(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const fetchStocks = async () => {
  const response = await handleRequest('/api/assets/Stock', {
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
  const data = await response.json();
  return data;
};

export const deleteStock = async (id) => {
  await handleRequest(`/api/assets/Stock/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
  });
};

export const searchMutualFunds = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`https://api.mfapi.in/mf/search?q=${query}`);
    if (!response.ok) throw new Error('Failed to fetch mutual fund schemes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching mutual fund schemes:', error);
    return [];
  }
};
