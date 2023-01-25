import { createSlice } from '@reduxjs/toolkit';

export const vendorDashboardSlice = createSlice({
  name: 'vendorDashboard',
  initialState: {
    isLoading: false,
    isError: false,
    ViewedProfiles: {},
    vendorPackageDetail: {},
    error: {}
  },
  reducers: {
    getViewedProfilesRequest: (state) => {
      return { ...state, isLoading: true };
    },
    getViewedProfilesSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, ViewedProfiles: payload, error: {} };
    },
    getViewedProfilesError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    getVendorPackageRequest: (state) => {
      return { ...state, isLoading: true };
    },
    getVendorPackageSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        vendorPackageDetail: payload,
        error: {}
      };
    },
    getVendorPackageError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    getVendorPackageErrorReset: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload == {} };
    }
  }
});

export const {
  getViewedProfilesRequest,
  getViewedProfilesSuccess,
  getViewedProfilesError,
  getVendorPackageRequest,
  getVendorPackageSuccess,
  getVendorPackageError,
  getVendorPackageErrorReset
} = vendorDashboardSlice.actions;
export default vendorDashboardSlice.reducer;
