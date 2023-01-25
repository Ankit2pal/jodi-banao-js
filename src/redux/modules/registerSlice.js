import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'formRegisterationDetails',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: ''
  },
  reducers: {
    shortRegistration: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        groomName: payload?.groomName,
        gender: payload?.gender,
        phoneNumber: payload?.phoneNumber
      };
    },
    onRegisterSubmit: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onRegisterSubmitSuccess: (state, { payload }) => {
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
    onRegisterSubmitError: (state, { payload }) => {
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
  onRegisterSubmit,
  onRegisterSubmitSuccess,
  onRegisterSubmitError,
  shortRegistration
} = registerSlice.actions;

export default registerSlice.reducer;
