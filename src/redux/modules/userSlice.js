import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    userRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    userSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    userError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    },
    userDeActiveRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    userDeActiveSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    userDeActiveError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    },
    userActiveRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    userActiveSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    userActiveError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    }
  }
});

export const {
  userRequest,
  userSuccess,
  userError,
  userDeActiveRequest,
  userDeActiveSuccess,
  userActiveError,
  userActiveRequest,
  userActiveSuccess,
  userDeActiveError
} = userSlice.actions;
export default userSlice.reducer;
