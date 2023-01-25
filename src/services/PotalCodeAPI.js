import API from '../constants/serviceConstants';
import { transformResponseForPostal } from '../utils/responseTranformHelpers';
import axiosInstance from './axiosInstance';

export const getPostalCodeAPI = async (value) => {
  let { data = {} } = await axiosInstance.get(API.postalCOde(value));
  data = transformResponseForPostal(data?.postalcodes);
  return data;
};
