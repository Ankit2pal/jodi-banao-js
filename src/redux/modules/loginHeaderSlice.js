import { createSlice } from '@reduxjs/toolkit';

export const loginHeaderSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: ''
  },
  reducers: {
    onLoginSubmit: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onLoginSubmitSuccess: (state, { payload }) => {
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
    onLoginSubmitError: (state, { payload }) => {
      const { data = {}, message = '' } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: data,
        message
      };
    },
    onLoginReset: (state) => {
      return { ...state, isLoading: false, data: {}, message: '', error: {}, isError: false };
    }
  }
});

export const { onLoginSubmit, onLoginSubmitError, onLoginSubmitSuccess, onLoginReset } =
  loginHeaderSlice.actions;

export default loginHeaderSlice.reducer;
