import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getUserRegisterationDetailsApi = async (userId) => {
  const { data = [] } = await axiosInstance.get(API.userRegisterationDetailsApi(userId));
  return data;
};
