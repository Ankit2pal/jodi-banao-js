import { createSlice } from '@reduxjs/toolkit';

export const registerationDetailsSlice = createSlice({
  name: 'registerationDetails',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
  },
  reducers: {
    fetchRegisterationDetails: (state) => ({ ...state, isLoading: true }),
    fetchRegisterationDetailsSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    fetchRegisterationDetailsError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    fetchCountryDetails: (state) => ({ ...state, isLoading: true }),
    fetchCountryDetailsSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, country: payload, error: {} };
    },
    fetchCountryDetailsError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    fetchStateDetails: (state) => ({ ...state, isLoading: true }),
    fetchStateDetailsSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, state: payload, error: {} };
    },
    fetchStateDetailsError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    fetchCityDetails: (state) => ({ ...state, isLoading: true }),
    fetchCityDetailsSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, city: payload, error: {} };
    },
    fetchCityDetailsError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const {
  fetchRegisterationDetails,
  fetchRegisterationDetailsSuccess,
  fetchRegisterationDetailsError,
  fetchCountryDetails,
  fetchCountryDetailsSuccess,
  fetchCountryDetailsError,
  fetchStateDetails,
  fetchStateDetailsSuccess,
  fetchStateDetailsError,
  fetchCityDetails,
  fetchCityDetailsSuccess,
  fetchCityDetailsError
} = registerationDetailsSlice.actions;
export default registerationDetailsSlice.reducer;
