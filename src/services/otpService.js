import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callSendOtpApi = async (UserId) => {
  const { data = {} } = await axiosInstance.post(API.sendOtp, { UserId });
  return data;
};

export const callverifyOtpApi = async (UserId, otp) => {
  const { data = {} } = await axiosInstance.post(API.verifyOtp, { UserId, otp });
  return data;
};
