import { createSlice } from '@reduxjs/toolkit';

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: ''
  },
  reducers: {
    onForgotPasswordSubmit: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onForgotPasswordSubmitSuccess: (state, { payload }) => {
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
    onForgotPasswordSubmitError: (state, { payload }) => {
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

export const {
  onForgotPasswordSubmit,
  onForgotPasswordSubmitError,
  onForgotPasswordSubmitSuccess
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
