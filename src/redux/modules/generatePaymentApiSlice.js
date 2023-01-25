import { createSlice } from '@reduxjs/toolkit';

export const generatePaymentApiSlice = createSlice({
  name: 'generatePaymentApi',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    fetchGeneratePaymentApi: (state) => {
      return { ...state, isLoading: true, data: [], message: '', error: {}, isError: false };
    },
    fetchGeneratePaymentApiSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    fetchGeneratePaymentApiError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const {
  fetchGeneratePaymentApi,
  fetchGeneratePaymentApiSuccess,
  fetchGeneratePaymentApiError
} = generatePaymentApiSlice.actions;
export default generatePaymentApiSlice.reducer;
