import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const editUserProfileAPI = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.editUserProfileApi, payload);
  return data;
};
