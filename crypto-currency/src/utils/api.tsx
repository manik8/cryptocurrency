// src/utils/api.ts

const API_BASE_URL = 'https://api.coincap.io/v2';

export const fetchCryptoDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrency details');
  }
  return response.json();
};

export const fetchCryptoHistory = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/assets/${id}/history?interval=d1`);
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrency history');
  }
  return response.json();
};
