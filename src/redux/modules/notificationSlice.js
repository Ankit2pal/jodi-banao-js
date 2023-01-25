import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
  },
  reducers: {
    notificationRequest: (state) => {
      return { ...state, isLoading: true, data: {}, error: {} };
    },
    notificationSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    notificationError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { notificationRequest, notificationSuccess, notificationError } =
  notificationSlice.actions;
export default notificationSlice.reducer;
