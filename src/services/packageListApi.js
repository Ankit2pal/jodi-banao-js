import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getPackagesRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(API.getPackagesDetail, payload);
  return data;
};
export const createPackagesRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.getPackagesDetail, payload);
  return data;
};
export const deletePackagesRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.delete(API.deletePackagesDetail, { data: payload });
  return data;
};
export const activatePackagesRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.activatePackagesDetail, { data: payload });
  return data;
};
export const updatePackageApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.updatePackages, payload);
  return data;
};
