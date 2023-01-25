import { createSlice } from '@reduxjs/toolkit';

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    fetchEditProfile: (state) => {
      return { ...state, isLoading: true, data: [], message: '', error: {}, isError: false };
    },
    fetchEditProfileSuccess: (state, { payload }) => {
      return { ...state, isLoading: false, isError: false, data: payload, error: {} };
    },
    fetchEditProfileError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
  }
});

export const { fetchEditProfile, fetchEditProfileSuccess, fetchEditProfileError } =
  editProfileSlice.actions;
export default editProfileSlice.reducer;
