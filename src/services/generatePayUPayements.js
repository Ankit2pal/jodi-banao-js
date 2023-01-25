import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const generatePayUPaymentApi = async (payload) => {
  const { data } = await axiosInstance.post(API.generatePayments, payload);
  return data;
};
export const generatePayUPaymentProcessApi = async (payload) => {
  const { data } = await axiosInstance.post('https://test.payu.in/_payment', payload);
  return data;
};
