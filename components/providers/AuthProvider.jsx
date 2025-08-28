'use client';

import { useEffect } from 'react';
import { store } from '@/store';
import { verifyToken, refreshToken, setLoading } from '@/store/slices/authSlice';

export default function AuthProvider({ children }) {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          store.dispatch(setLoading(false));
          return;
        }

        // Check if we have a token in localStorage
        const token = localStorage.getItem('access_token');
        const refreshTokenValue = localStorage.getItem('refresh_token');

        if (token) {
          try {
            // Try to verify the current token
            const verifyResult = await store.dispatch(verifyToken()).unwrap();
          } catch (error) {
            // If verification fails, try to refresh the token
            if (refreshTokenValue) {
              try {
                const refreshResult = await store.dispatch(refreshToken()).unwrap();
              } catch (refreshError) {
                // If refresh fails, clear everything
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
              }
            }
          }
        }
      } catch (error) {
        // Clear invalid tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      } finally {
        store.dispatch(setLoading(false));
      }
    };

    initializeAuth();
  }, []);

  return children;
}
