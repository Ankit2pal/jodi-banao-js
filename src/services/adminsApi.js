import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getAdminRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.adminList, payload);
  return data;
};
