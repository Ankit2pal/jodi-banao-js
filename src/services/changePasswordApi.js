import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callChangePasswordApi = async (NewPassword, OldPassword, UserId) => {
  const { data = {} } = await axiosInstance.post(API.changePassword, {
    NewPassword,
    OldPassword,
    UserId
  });
  return data;
};
