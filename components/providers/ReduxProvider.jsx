'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import AuthProvider from './AuthProvider';
import { ToastProvider } from '@/components/ui/Toast';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}
