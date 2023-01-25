import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getUserPhotosApi = async (userId) => {
  const { data = [] } = await axiosInstance.get(API.userPhotosApi(userId));
  return data;
};

export const uploadFilesApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.uploadUserPhotosApi, payload.payload);
  return data;
};

export const deleteUserPhotoApi = async (imageId) => {
  const { data = {} } = await axiosInstance.delete(API.deleteUserPhotosApi(imageId));
  return data;
};
