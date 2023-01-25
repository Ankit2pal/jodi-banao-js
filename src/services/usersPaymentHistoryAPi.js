import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getUserPaymentHistoryApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.userPaymentHistory, payload);
  return data;
};
