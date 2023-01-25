import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getViewedProfilesApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.viewProfile, payload);
  return data;
};

export const getAdminPackageDetailApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(API.getAdminPackageApi, payload);
  return data;
};
