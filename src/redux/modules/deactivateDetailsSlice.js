import { createSlice } from '@reduxjs/toolkit';

export const deactivateDetailSlice = createSlice({
  name: 'deactivateDetail',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    fetchDeactivateDetail: (state) => ({ ...state, isLoading: true }),
    fetchDeactivateDetailSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    fetchDeactivateDetailError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const { fetchDeactivateDetail, fetchDeactivateDetailSuccess, fetchDeactivateDetailError } =
  deactivateDetailSlice.actions;

export default deactivateDetailSlice.reducer;
