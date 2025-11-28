import api from './api';

export const authService = {
  // Login user
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Register user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  // Update user profile
  async updateProfile(profileData) {
    const response = await api.put('/auth/profile', profileData);
    return response.data.user;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  }
};