import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getViewedProfilesApi = async (userId) => {
  const { data = {} } = await axiosInstance.get(API.viewedProfiles(userId));
  return data;
};

export const getBalanceProfileApi = async (userId) => {
  const { data = {} } = await axiosInstance.get(API.getBalanceCount(userId));
  return data;
};

export const getVendorBalanceProfileApi = async (userId) => {
  const { data = {} } = await axiosInstance.get(API.getVenBalanceCount(userId));
  return data;
};
