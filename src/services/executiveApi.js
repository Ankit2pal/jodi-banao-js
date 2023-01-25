import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getExecutiveRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.executiveList, payload);
  return data;
};
