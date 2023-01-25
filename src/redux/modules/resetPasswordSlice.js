import { createSlice } from '@reduxjs/toolkit';

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: ''
  },
  reducers: {
    onResetPasswordSubmit: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onResetPasswordSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = '' } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        error: {},
        message
      };
    },
    onResetPasswordSubmitError: (state, { payload }) => {
      const { data = {}, message = '' } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: data,
        message
      };
    }
  }
});

export const { onResetPasswordSubmit, onResetPasswordSubmitSuccess, onResetPasswordSubmitError } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
