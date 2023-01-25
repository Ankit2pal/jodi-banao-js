import API from '../constants/serviceConstants';
import { transformResponseForDropDown } from '../utils/responseTranformHelpers';
import axiosInstance from './axiosInstance';

export const getCastes = async (religionId) => {
  try {
    const { data = [] } = await axiosInstance.get(API.getCasteUrl(religionId));
    return transformResponseForDropDown(data, 'CastName');
  } catch {
    return [];
  }
};
