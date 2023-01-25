import { createSlice } from '@reduxjs/toolkit';

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
  },
  reducers: {
    onSearchSubmit: (state) => {
      return { ...state, isLoading: true, error: {} };
    },
    onSearchSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    },
    onSearchError: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      };
    },
    onLoginResetSearch: (state) => {
      return { ...state, isLoading: false, data: {}, iserror: {} };
    }
  }
});

export const { onSearchSubmit, onSearchSuccess, onSearchError, onLoginResetSearch } =
  searchResultsSlice.actions;

export default searchResultsSlice.reducer;
