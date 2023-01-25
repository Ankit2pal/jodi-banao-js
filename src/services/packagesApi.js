import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getPackageDetailsApi = async () => {
  const { data = [] } = await axiosInstance.get(API.getPackagesDetail);
  return data;
};
// Create packages-list
export const createPackageDetailsApi = async () => {
  const { data = [] } = await axiosInstance.post(API.getPackagesDetail);
  return data;
};
