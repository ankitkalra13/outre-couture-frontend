import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/lib/api';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getProducts(filters);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch products');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiService.getProduct(productId);
      if (response.success) {
        return response.product;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch product');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await apiService.createProduct(productData);
      if (response.success) {
        return response.product;
      } else {
        return rejectWithValue(response.error || 'Failed to create product');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateProduct(productId, productData);
      if (response.success) {
        return response.product;
      } else {
        return rejectWithValue(response.error || 'Failed to update product');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiService.deleteProduct(productId);
      if (response.success) {
        return productId;
      } else {
        return rejectWithValue(response.error || 'Failed to delete product');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

export const fetchProductsByMainCategory = createAsyncThunk(
  'products/fetchProductsByMainCategory',
  async ({ mainCategorySlug, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await apiService.getProductsByMainCategory(mainCategorySlug, filters);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch products by category');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products by category');
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async ({ mainCategory, slug }, { rejectWithValue }) => {
    try {
      const response = await apiService.getProductBySlug(mainCategory, slug);
      if (response.success) {
        return response.product;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch product by slug');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product by slug');
    }
  }
);

// Initial state
const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category_id: '',
    sub_category_id: '',
    search: '',
    sortBy: 'name',
    viewMode: 'grid',
  },
  pagination: {
    total: 0,
    limit: 50,
    skip: 0,
  },
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category_id: '',
        sub_category_id: '',
        search: '',
        sortBy: 'name',
        viewMode: 'grid',
      };
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
          .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = {
        total: action.payload.total,
        limit: action.payload.limit,
        skip: action.payload.skip,
      };
    })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Single Product
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct && state.currentProduct.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
        state.pagination.total -= 1;
        if (state.currentProduct && state.currentProduct.id === action.payload) {
          state.currentProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Products By Main Category
    builder
      .addCase(fetchProductsByMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          total: action.payload.total,
          limit: action.payload.limit,
          skip: action.payload.skip,
        };
      })
      .addCase(fetchProductsByMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Product By Slug
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentProduct,
  clearCurrentProduct,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
