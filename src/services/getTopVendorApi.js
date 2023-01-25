import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getTopVendorAPI = async () => {
  const { data = [] } = await axiosInstance.get(API.getTopVendor);
  return data;
};
