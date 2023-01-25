import { createSlice } from '@reduxjs/toolkit';

export const packagesDetailSlice = createSlice({
  name: 'packagesDetail',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    fetchPackagesDetail: (state) => {
      return { ...state, isLoading: true, data: [], message: '', error: {}, isError: false };
    },
    fetchPackagesDetailSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    fetchPackagesDetailError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const { fetchPackagesDetail, fetchPackagesDetailSuccess, fetchPackagesDetailError } =
  packagesDetailSlice.actions;
export default packagesDetailSlice.reducer;
