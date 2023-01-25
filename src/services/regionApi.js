import API from '../constants/serviceConstants';
import { transformResponseForDropDown } from '../utils/responseTranformHelpers';
import axiosInstance from './axiosInstance';

export const getStates = async (countryId) => {
  try {
    const { data = [] } = await axiosInstance.get(API.getStateUrl(countryId));
    return transformResponseForDropDown(data, 'StateorCounty');
  } catch {
    return [];
  }
};

export const getDistricts = async (stateId) => {
  try {
    const { data = [] } = await axiosInstance.get(API.getDistrictsUrl(stateId));
    return transformResponseForDropDown(data, 'DistrictName');
  } catch {
    return [];
  }
};

export const getCities = async (districtId) => {
  try {
    const { data = [] } = await axiosInstance.get(API.getCitiesUrl(districtId));
    return transformResponseForDropDown(data, 'CityName');
  } catch {
    return [];
  }
};
