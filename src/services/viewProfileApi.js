import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getViewProfileDetailsApi = async (userId) => {
  const { data = [] } = await axiosInstance.post(API.viewProfile, userId);
  return data;
};
