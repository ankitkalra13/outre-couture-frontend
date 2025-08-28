import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/lib/api';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getCategories();
      if (response.success) {
        return response.categories;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch categories');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

export const fetchMainCategories = createAsyncThunk(
  'categories/fetchMainCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getMainCategories();
      if (response.success) {
        return response.categories;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch main categories');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch main categories');
    }
  }
);

export const fetchSubCategories = createAsyncThunk(
  'categories/fetchSubCategories',
  async (mainCategorySlug, { rejectWithValue }) => {
    try {
      const response = await apiService.getSubCategories(mainCategorySlug);
      if (response.success) {
        return { mainCategorySlug, categories: response.categories };
      } else {
        return rejectWithValue(response.error || 'Failed to fetch sub categories');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch sub categories');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await apiService.createCategory(categoryData);
      if (response.success) {
        return response.category;
      } else {
        return rejectWithValue(response.error || 'Failed to create category');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateCategory(categoryId, categoryData);
      if (response.success) {
        return response.category;
      } else {
        return rejectWithValue(response.error || 'Failed to update category');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await apiService.deleteCategory(categoryId);
      if (response.success) {
        return categoryId;
      } else {
        return rejectWithValue(response.error || 'Failed to delete category');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete category');
    }
  }
);

export const fetchCategoriesForAdmin = createAsyncThunk(
  'categories/fetchCategoriesForAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getCategoriesForAdmin();
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch categories for admin');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories for admin');
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  mainCategories: [],
  subCategories: {},
  loading: false,
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Main Categories
    builder
      .addCase(fetchMainCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCategories = action.payload;
      })
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Sub Categories
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories[action.payload.mainCategorySlug] = action.payload.categories;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Categories For Admin
    builder
      .addCase(fetchCategoriesForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.main_categories.concat(action.payload.sub_categories_by_main ? Object.values(action.payload.sub_categories_by_main).flat() : []);
        state.mainCategories = action.payload.main_categories;
        // Organize sub-categories by main category
        if (action.payload.sub_categories_by_main) {
          state.subCategories = action.payload.sub_categories_by_main;
        }
      })
      .addCase(fetchCategoriesForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setLoading } = categorySlice.actions;
export default categorySlice.reducer;
