import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getRelatedUsersAPi = async (userId) => {
  const { data = {} } = await axiosInstance.post(API.getRelatedUsersAPi, userId);
  return data;
};
