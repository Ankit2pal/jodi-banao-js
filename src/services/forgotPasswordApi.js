import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callForgotPasswordApi = async (EmailId) => {
  const { data = {} } = await axiosInstance.post(API.forgotPassword, { EmailId });
  return data;
};
