import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import rfqReducer from './slices/rfqSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    products: productReducer,
    categories: categoryReducer,
    rfq: rfqReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

// For TypeScript support (if needed later)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
