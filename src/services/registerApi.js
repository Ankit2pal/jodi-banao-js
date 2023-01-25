import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callRegisterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.register, payload);
  return data;
};

export const callEmailValidation = async ({ email }) => {
  const { data = {} } = await axiosInstance.post(API.validateEmail, { EmailId: email });
  return data;
};

export const callMobileValidation = async ({ phone }) => {
  const { data = {} } = await axiosInstance.post(API.validateMobile, { MobileNumber: phone });
  return data;
};
export const callContactUs = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.contact, payload);
  return data;
};
