import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getNotificationApi = async (userId) => {
  const { data = [] } = await axiosInstance.get(API.getNotificationApi(userId));
  return data;
};
