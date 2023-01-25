import { createSlice } from '@reduxjs/toolkit';

export const sendNotificationSlice = createSlice({
  name: 'sendnotification',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
  },
  reducers: {
    sendNotificationRequest: (state) => {
      return { ...state, isLoading: true, data: {}, error: {} };
    },
    sendNotificationSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    sendNotificationError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { sendNotificationRequest, sendNotificationSuccess, sendNotificationError } =
  sendNotificationSlice.actions;
export default sendNotificationSlice.reducer;
