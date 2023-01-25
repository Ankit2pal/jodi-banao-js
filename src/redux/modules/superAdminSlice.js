import { createSlice } from '@reduxjs/toolkit';

export const superAdminSlice = createSlice({
  name: 'SuperAdmin',
  initialState: {
    isLoading: false,
    isError: false,
    ViewedProfiles: {},
    superAdminkageDetail: {},
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
    getSuperAdminPackageRequest: (state) => ({ ...state, isLoading: true }),
    getSuperAdminPackageSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        superAdminkageDetail: payload,
        error: {}
      };
    },
    getSuperAdminPackageError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const {
  getViewedProfilesRequest,
  getViewedProfilesSuccess,
  getViewedProfilesError,
  getSuperAdminPackageRequest,
  getSuperAdminPackageSuccess,
  getSuperAdminPackageError
} = superAdminSlice.actions;
export default superAdminSlice.reducer;
