import { createSlice } from '@reduxjs/toolkit';

export const userRegisterationDetailsSlice = createSlice({
  name: 'userRegisterationDetails',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
  },
  reducers: {
    checkBalanceProfile: (state, { payload }) => {
      return { ...state, balanceProfile: payload };
    },
    fetchUserRegisterationDetails: (state) => ({ ...state, isLoading: true }),
    fetchUserRegisterationDetailsSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    fetchUserRegisterationDetailsError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    resetUserRegisterationDetail: () => {
      return { isLoading: false, isError: false, data: {}, error: {} };
    }
  }
});

export const {
  fetchUserRegisterationDetails,
  fetchUserRegisterationDetailsSuccess,
  fetchUserRegisterationDetailsError,
  resetUserRegisterationDetail,
  checkBalanceProfile
} = userRegisterationDetailsSlice.actions;
export default userRegisterationDetailsSlice.reducer;
