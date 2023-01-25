import { createSlice } from '@reduxjs/toolkit';

export const executiveSlice = createSlice({
  name: 'executive',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    executiveRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    executiveSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    executiveError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const { executiveRequest, executiveSuccess, executiveError } = executiveSlice.actions;
export default executiveSlice.reducer;
