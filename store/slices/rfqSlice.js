import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/lib/api';

// Async thunks
export const submitRFQ = createAsyncThunk(
  'rfq/submitRFQ',
  async (rfqData, { rejectWithValue }) => {
    try {
      const response = await apiService.submitRFQ(rfqData);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.error || 'Failed to submit RFQ');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to submit RFQ');
    }
  }
);

export const fetchRFQRequests = createAsyncThunk(
  'rfq/fetchRFQRequests',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getRFQRequests(filters);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch RFQ requests');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch RFQ requests');
    }
  }
);

export const updateRFQStatus = createAsyncThunk(
  'rfq/updateRFQStatus',
  async ({ rfqId, statusData }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateRFQStatus(rfqId, statusData);
      if (response.success) {
        return { rfqId, statusData };
      } else {
        return rejectWithValue(response.error || 'Failed to update RFQ status');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update RFQ status');
    }
  }
);

// Initial state
const initialState = {
  rfqRequests: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    limit: 50,
    skip: 0,
  },
  pagination: {
    total: 0,
    limit: 50,
    skip: 0,
  },
};

// RFQ slice
const rfqSlice = createSlice({
  name: 'rfq',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        limit: 50,
        skip: 0,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Submit RFQ
    builder
      .addCase(submitRFQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRFQ.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitRFQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch RFQ Requests
    builder
      .addCase(fetchRFQRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRFQRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.rfqRequests = action.payload.rfq_requests;
        state.pagination = {
          total: action.payload.total,
          limit: action.payload.limit,
          skip: action.payload.skip,
        };
      })
      .addCase(fetchRFQRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update RFQ Status
    builder
      .addCase(updateRFQStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRFQStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { rfqId, statusData } = action.payload;
        const index = state.rfqRequests.findIndex(rfq => rfq.id === rfqId);
        if (index !== -1) {
          state.rfqRequests[index] = {
            ...state.rfqRequests[index],
            status: statusData.status,
            notes: statusData.notes,
            updated_at: new Date().toISOString(),
          };
        }
      })
      .addCase(updateRFQStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError } = rfqSlice.actions;
export default rfqSlice.reducer;
