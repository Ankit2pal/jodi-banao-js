import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const sendNotificationAPI = async (req) => {
  const { data = [] } = await axiosInstance.post(API.sendNotificationApi, req);
  return data;
};
