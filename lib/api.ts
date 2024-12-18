import axios from 'axios';
import { config } from './config';

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    const parsedToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsedToken.state.token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Implement token refresh logic here
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle rate limiting
    if (error.response?.status === 429) {
      // Implement rate limit handling
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(api(originalRequest));
        }, 5000);
      });
    }

    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data; // Expecting access_token and other data
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  register: async (email: string, password: string) => {
    try {
      const response = await api.post('/register', { email, password });
      return response.data; // Expecting success message or other data
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};

export const threats = {
  // Retrieve lookup history
  getLookupHistory: async (userId: string | null = null, filters: Record<string, any> = {}) => {
    try {
      const response = await api.get('/threats/history', {
        params: { userId, ...filters },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching lookup history:', error);
      throw error;
    }
  },

  // Single threat lookup
  lookup: async (query: string, type: string) => {
    try {
      const response = await api.post('/threats/lookup', { query, type });
      return response.data;
    } catch (error) {
      console.error('Error performing lookup:', error);
      throw error;
    }
  },

  // Bulk lookup
  bulkLookup: async (items: string[], lookupType: string) => {
    try {
      const queries = items.map((item) => ({ query: item, type: lookupType }));
      const response = await api.post('/threats/bulk-lookup', { queries });
      return response.data;
    } catch (error) {
      console.error('Error performing bulk lookup:', error);
      throw error;
    }
  },
};


export default api;