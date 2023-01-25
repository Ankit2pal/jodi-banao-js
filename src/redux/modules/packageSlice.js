import { createSlice } from '@reduxjs/toolkit';

export const packageSlice = createSlice({
  name: 'packages',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    packageRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    packageSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    packageError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    },

    // Create packages-list
    createpackageRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    createpackageSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    createpackageError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    },

    deletepackageRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    deletepackageSuccess: (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    deletepackageError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    },
    updatepackageRequest: (state) => {
      return { ...state, isLoading: true, data: [], error: {} };
    },
    updatepackageSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    updatepackageError: (state, { payload }) => {
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
  packageRequest,
  packageSuccess,
  packageError,
  createpackageRequest,
  createpackageSuccess,
  createpackageError,
  deletepackageRequest,
  deletepackageSuccess,
  deletepackageError,
  updatepackageRequest,
  updatepackageSuccess,
  updatepackageError
} = packageSlice.actions;
export default packageSlice.reducer;
