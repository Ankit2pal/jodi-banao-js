import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getDeactivateDetailsApi = async () => {
  const { data = [] } = await axiosInstance.get(API.getDeactivateDetailsApi);
  return data;
};
