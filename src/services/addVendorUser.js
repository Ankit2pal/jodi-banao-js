import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const addVendorUserApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.addVendorUserApi, payload);
  return data;
};
