import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosError } from "axios"

interface AuthState {
  token: string | null;
  user: any | null;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  refreshToken: () => Promise<boolean>; // Add this method
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      refreshToken: async () => {
        try {
          const response = await axios.post('/auth/refresh', { /* optional payload */ });
          set({ token: response.data.token });
          return true;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          return false;
        }
      },
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);