import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const getRegisterationDetailsApi = async () => {
  const { data = [] } = await axiosInstance.get(API.getRegisterationDetails);
  return data;
};

export const getCountryDetailsApi = async () => {
  const { data = [] } = await axiosInstance.get(API.getRegisterationDetails);
  return data;
};
export const getStateDetailsApi = async () => {
  const { data = [] } = await axiosInstance.get(API.getRegisterationDetails);
  return data;
};
