import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callCompleteRegisterationApi = async (formattedRequest) => {
  const { data = {} } = await axiosInstance.post(API.completeRegisterationApi, formattedRequest);
  return data;
};
