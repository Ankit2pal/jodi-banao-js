import { createSlice } from '@reduxjs/toolkit';

export const changePasswordSlice = createSlice({
  name: 'changepassword',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: ''
  },
  reducers: {
    onChangePasswordSubmit: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onChangePasswordSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = '', Status } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        error: {},
        message,
        Status
      };
    },
    onChangePasswordSubmitError: (state, { payload }) => {
      const { data = {}, message = '', Status } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: data,
        message,
        Status
      };
    }
  }
});

export const {
  onChangePasswordSubmit,
  onChangePasswordSubmitSuccess,
  onChangePasswordSubmitError
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
