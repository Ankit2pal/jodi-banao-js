import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callLoginApi = async (EmailId, PasswordHash) => {
  const { data = {} } = await axiosInstance.post(API.login, { EmailId, PasswordHash });
  return data;
};
