import { createSlice } from '@reduxjs/toolkit';

export const completeRegisterationSlice = createSlice({
  name: 'completeRegisteration',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
  },
  reducers: {
    onSubmitDetails: (state) => {
      return { ...state, isLoading: true, data: {}, error: {} };
    },
    onSubmitDetailsSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    onSubmitDetailsError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { onSubmitDetails, onSubmitDetailsSuccess, onSubmitDetailsError } =
  completeRegisterationSlice.actions;
export default completeRegisterationSlice.reducer;
