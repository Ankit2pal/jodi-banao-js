import { createSlice } from '@reduxjs/toolkit';

export const vendorByUserAdd = createSlice({
  name: 'addVendorUser',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    addVendorUser: (state) => {
      return { ...state, isLoading: true, data: [], message: '', error: {}, isError: false };
    },
    addVendorUserSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    addVendorUserError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    addVendorUserReset: (state) => {
      return { ...state, isLoading: false, isError: false, error: {}, data: [] };
    }
  }
});

export const { addVendorUser, addVendorUserSuccess, addVendorUserError, addVendorUserReset } =
  vendorByUserAdd.actions;
export default vendorByUserAdd.reducer;
