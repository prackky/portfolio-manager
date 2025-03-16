const API_BASE_URL = '/api/assets';

// Add a new cash asset
export const addCashAsset = async (payload) => {
  const response = await fetch('/api/add_cash_asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

// Fetch all assets
export const fetchAssets = async () => {
  const response = await fetch(API_BASE_URL, {
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
  return response.json();
};

// Fetch cash assets
export const fetchCashAssets = async () => {
  const response = await fetch(`${API_BASE_URL}/Cash`, {
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
  return response.json();
};

// Delete a cash asset by ID
export const deleteCashAsset = async (id) => {
  await fetch(`${API_BASE_URL}/Cash/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
};

// Update a cash asset by ID
export const updateCashAsset = async (id, updatedCash) => {
  await fetch(`${API_BASE_URL}/Cash/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(updatedCash),
  });
};

// Add a new fixed income asset
export const addFixedIncome = async (payload) => {
  const response = await fetch('/api/add_fixed_income', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

// Update a fixed income asset by ID
export const updateFixedIncome = async (id, payload) => {
  const response = await fetch(`/api/assets/FixedIncome/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const getFixedIncomes = async () => {
  const response = await fetch('/api/assets/FixedIncome', {
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
  const data = await response.json();
  return data;
};

export const deleteFixedIncome = async (id) => {
  await fetch(`/api/assets/FixedIncome/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
};

export const addMutualFund = async (payload) => {
  const response = await fetch('/api/add_mutual_fund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });

  return response;
};

export const updateMutualFund = async (payload) => {
  const response = await fetch(`/api/assets/MutualFund/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });

  return response;
};

export const getMutualFunds = async () => {
  const response = await fetch('/api/assets/MutualFund', {
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
  const data = await response.json();
  return data;
};

export const deleteMutualFund = async (id) => {
  await fetch(`/api/assets/MutualFund/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
};

export const addRealEstate = async (payload) => {
  const response = await fetch('/api/add_real_estate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const updateRealEstate = async (id, payload) => {
  const response = await fetch(`/api/assets/RealEstate/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });
  return response;
};

export const fetchRealEstates = async () => {
  const response = await fetch('/api/assets/RealEstate', {
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
  const data = await response.json();
  return data;
};

export const deleteRealEstate = async (id) => {
  await fetch(`/api/assets/RealEstate/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
};

export const saveStock = async (payload) => {
  const url = '/api/add_stock';
  const method = 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });

  return response;
};

export const editStock = async (payload) => {
  const url = `/api/assets/Stock/${payload.id}`;
  const method = 'PUT';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify(payload),
  });

  return response;
};

export const fetchStocks = async () => {
  const response = await fetch('/api/assets/Stock', {
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
  const data = await response.json();
  return data;
};

export const deleteStock = async (id) => {
  await fetch(`/api/assets/Stock/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }
  });
};
