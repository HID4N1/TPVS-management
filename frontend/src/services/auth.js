import api from './client';

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('auth/login/', { email, password });
    return response.data;
  },
  refresh: async (refreshToken) => {
    const response = await api.post('auth/refresh/', { refresh: refreshToken });
    return response.data;
  },
  me: async () => {
    const response = await api.get('auth/me/');
    return response.data;
  },
};

export default authAPI;
