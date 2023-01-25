import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callResetPasswordApi = async (password, UID, userid) => {
  const { data = {} } = await axiosInstance.post(API.resetPassword, { password, UID, userid });
  return data;
};
