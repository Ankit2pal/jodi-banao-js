import { createSlice } from '@reduxjs/toolkit';

export const vendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    vendorRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    vendorSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    vendorError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { vendorRequest, vendorSuccess, vendorError } = vendorSlice.actions;
export default vendorSlice.reducer;
