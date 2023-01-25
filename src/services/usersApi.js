import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getUserRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.userList, payload);
  return data;
};

export const DeActiveUserRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.deActiveUser, payload);
  return data;
};

export const ActiveUserRequestApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.activeUser, payload);
  return data;
};
