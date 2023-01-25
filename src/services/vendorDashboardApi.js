import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getViewedProfilesApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.viewProfile, payload);
  return data;
};

export const getVendorPackageDetailApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(API.getVendorPackageApi(payload));
  return data;
};
