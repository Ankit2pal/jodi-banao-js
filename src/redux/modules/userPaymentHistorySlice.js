import { createSlice } from '@reduxjs/toolkit';

export const userPaymentHistorySlice = createSlice({
  name: 'usersPaymentHistory',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    userPaymentHistoryRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    userPaymentHistorySuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    userPaymentHistoryError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { userPaymentHistoryRequest, userPaymentHistorySuccess, userPaymentHistoryError } =
  userPaymentHistorySlice.actions;
export default userPaymentHistorySlice.reducer;
