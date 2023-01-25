import { createSlice } from '@reduxjs/toolkit';

export const managePhotoSlice = createSlice({
  name: 'userPhotos',
  initialState: {
    isLoading: false,
    isUploaded: false,
    isDeleted: false,
    isError: false,
    data: [],
    error: {}
  },
  reducers: {
    getPhotosRequest: (state) => ({ ...state, isLoading: true }),
    getPhotosSuccess: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isUploaded: false,
        isDeleted: false,
        isError: false,
        data: payload,
        error: {}
      };
    },
    getPhotosError: (state, { payload }) => {
      return { ...state, isLoading: false, isError: true, error: payload };
    },
    deletePhotosRequest: (state) => ({ ...state, isLoading: true }),
    deletePhotosSuccess: (state) => {
      return { ...state, isLoading: false, isError: false, isDeleted: true, error: {} };
    },
    deletePhotosError: (state, { payload }) => {
      const { message = '' } = payload;
      return { ...state, isLoading: false, isError: true, error: payload, message };
    },

    uploadFileRequest: (state) => {
      return { ...state, isLoading: true, message: '', error: {}, isError: false };
    },
    uploadFileSuccess: (state, { payload }) => {
      const { message = '' } = payload;
      return {
        ...state,
        isLoading: false,
        isUploaded: true,
        isError: false,
        error: {},
        message
      };
    },
    uploadFileError: (state, { payload }) => {
      const { message = '', error = '' } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: error,
        message
      };
    }
  }
});

export const {
  getPhotosRequest,
  getPhotosSuccess,
  getPhotosError,
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileError,
  deletePhotosError,
  deletePhotosRequest,
  deletePhotosSuccess
} = managePhotoSlice.actions;
export default managePhotoSlice.reducer;
