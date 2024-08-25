// src/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['x-access-token'] = response.data.token;
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['x-access-token'];
};

const getToken = () => {
  return localStorage.getItem('token');
};

if (getToken()) {
  axios.defaults.headers.common['x-access-token'] = getToken();
}

export default {
  login,
  logout,
  getToken,
};