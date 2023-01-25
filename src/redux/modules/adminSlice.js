import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    adminRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    adminSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    adminError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { adminRequest, adminSuccess, adminError } = adminSlice.actions;
export default adminSlice.reducer;
