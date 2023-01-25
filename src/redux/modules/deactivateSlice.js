import { createSlice } from '@reduxjs/toolkit';

export const deactivateSlice = createSlice({
  name: 'deactivate',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: ''
  },
  reducers: {
    onDeactivateSubmit: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onDeactivateSubmitSuccess: (state, { payload }) => {
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
    onDeactivateSubmitError: (state, { payload }) => {
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

export const { onDeactivateSubmit, onDeactivateSubmitSuccess, onDeactivateSubmitError } =
  deactivateSlice.actions;

export default deactivateSlice.reducer;
