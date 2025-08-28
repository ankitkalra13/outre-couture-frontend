import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

// Custom hooks for specific slices
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useAdmin = () => {
  return useAppSelector((state) => state.admin);
};

export const useProducts = () => {
  return useAppSelector((state) => state.products);
};

export const useCategories = () => {
  return useAppSelector((state) => state.categories);
};

export const useRFQ = () => {
  return useAppSelector((state) => state.rfq);
};

// Selector hooks for specific data
export const useUser = () => {
  return useAppSelector((state) => state.auth.user);
};

export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};

export const useIsAdmin = () => {
  return useAppSelector((state) => state.auth.isAdmin);
};

export const useAuthLoading = () => {
  return useAppSelector((state) => state.auth.loading);
};

export const useAuthError = () => {
  return useAppSelector((state) => state.auth.error);
};

export const useActiveTab = () => {
  return useAppSelector((state) => state.admin.activeTab);
};

export const useShowLoginForm = () => {
  return useAppSelector((state) => state.admin.showLoginForm);
};

export const useDashboardStats = () => {
  return useAppSelector((state) => state.admin.dashboardStats);
};

export const useProductFilters = () => {
  return useAppSelector((state) => state.products.filters);
};

export const useProductPagination = () => {
  return useAppSelector((state) => state.products.pagination);
};

export const useRFQFilters = () => {
  return useAppSelector((state) => state.rfq.filters);
};
