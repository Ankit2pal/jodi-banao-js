import { createSlice } from '@reduxjs/toolkit';

export const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    isLoading: false,
    isError: false,
    ViewedProfiles: {},
    adminPackageDetail: {},
    error: {}
  },
  reducers: {
    getViewedProfilesRequest: (state) => ({ ...state, isLoading: true }),
    getViewedProfilesSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, ViewedProfiles: payload, error: {} };
    },
    getViewedProfilesError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    getAdminPackageRequest: (state) => ({ ...state, isLoading: true }),
    getAdminPackageSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        adminPackageDetail: payload,
        error: {}
      };
    },
    getAdminPackageError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const {
  getViewedProfilesRequest,
  getViewedProfilesSuccess,
  getViewedProfilesError,
  getAdminPackageRequest,
  getAdminPackageSuccess,
  getAdminPackageError
} = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
