import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getVendorRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.vendorList, payload);
  return data;
};
