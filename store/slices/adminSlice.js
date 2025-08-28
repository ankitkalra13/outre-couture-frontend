import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  activeTab: 'dashboard',
  showLoginForm: false,
  dashboardStats: {
    products: 0,
    categories: 0,
    rfqRequests: 0,
    newRFQ: 0,
  },
  loading: false,
  error: null,
};

// Admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setShowLoginForm: (state, action) => {
      state.showLoginForm = action.payload;
    },
    setDashboardStats: (state, action) => {
      state.dashboardStats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAdminState: (state) => {
      state.activeTab = 'dashboard';
      state.showLoginForm = false;
      state.dashboardStats = {
        products: 0,
        categories: 0,
        rfqRequests: 0,
        newRFQ: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setActiveTab,
  setShowLoginForm,
  setDashboardStats,
  setLoading,
  setError,
  clearError,
  resetAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;
