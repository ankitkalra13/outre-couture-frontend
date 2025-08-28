'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Toast context
const ToastContext = createContext();

// Toast provider
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, TOAST_TYPES.ERROR, duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, TOAST_TYPES.WARNING, duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, TOAST_TYPES.INFO, duration), [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast hook
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Toast container
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual toast component
function Toast({ toast, removeToast }) {
  const { type, message, id } = toast;

  const getToastStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          icon: 'text-green-500',
          iconBg: 'bg-green-100',
          iconComponent: CheckCircle,
        };
      case TOAST_TYPES.ERROR:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
          iconBg: 'bg-red-100',
          iconComponent: AlertCircle,
        };
      case TOAST_TYPES.WARNING:
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-500',
          iconBg: 'bg-yellow-100',
          iconComponent: AlertTriangle,
        };
      case TOAST_TYPES.INFO:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500',
          iconBg: 'bg-blue-100',
          iconComponent: Info,
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          icon: 'text-gray-500',
          iconBg: 'bg-gray-100',
          iconComponent: Info,
        };
    }
  };

  const styles = getToastStyles();
  const IconComponent = styles.iconComponent;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`max-w-sm w-full ${styles.bg} border rounded-lg shadow-lg p-4`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center`}>
          <IconComponent size={16} className={styles.icon} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${styles.text}`}>
            {message}
          </p>
        </div>
        
        <button
          onClick={() => removeToast(id)}
          className={`flex-shrink-0 ml-2 ${styles.text} hover:opacity-70 transition-opacity`}
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// Toast component for direct use (alternative to hook)
export function ToastMessage({ message, type, duration, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          icon: 'text-green-500',
          iconBg: 'bg-green-100',
          iconComponent: CheckCircle,
        };
      case TOAST_TYPES.ERROR:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
          iconBg: 'bg-red-100',
          iconComponent: AlertCircle,
        };
      case TOAST_TYPES.WARNING:
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-500',
          iconBg: 'bg-yellow-100',
          iconComponent: AlertTriangle,
        };
      case TOAST_TYPES.INFO:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500',
          iconBg: 'bg-blue-100',
          iconComponent: Info,
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          icon: 'text-gray-500',
          iconBg: 'bg-gray-100',
          iconComponent: Info,
        };
    }
  };

  const styles = getToastStyles();
  const IconComponent = styles.iconComponent;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`max-w-sm w-full ${styles.bg} border rounded-lg shadow-lg p-4`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center`}>
          <IconComponent size={16} className={styles.icon} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${styles.text}`}>
            {message}
          </p>
        </div>
        
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className={`flex-shrink-0 ml-2 ${styles.text} hover:opacity-70 transition-opacity`}
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
