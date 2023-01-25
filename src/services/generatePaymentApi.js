import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const generatePaymentApi = async (payload) => {
  const { data } = await axiosInstance.post(API.generatePaymentApi, payload.payload);
  return data;
};
