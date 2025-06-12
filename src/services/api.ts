import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchWatches = async () => {
  const response = await axios.get(`${API_URL}/watches`);
  return response.data;
};

export const fetchUser = async (userId: string) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};

export const fetchRecommendations = async (userId: string) => {
  const response = await axios.get(`${API_URL}/recommendations/${userId}`);
  return response.data;
};

export const fetchWatchDetails = async (watchId: string) => {
  const response = await axios.get(`${API_URL}/watches/${watchId}`);
  return response.data;
};

export const fetchRetailers = async () => {
  const response = await axios.get(`${API_URL}/retailers`);
  return response.data;
}; 