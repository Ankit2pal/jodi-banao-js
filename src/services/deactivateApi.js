import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const deactivateApi = async (body) => {
  const { data = {} } = await axiosInstance.post(API.deactivateApi, body);
  return data;
};
