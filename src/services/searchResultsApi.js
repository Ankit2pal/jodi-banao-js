import API from '../constants/serviceConstants';
import axiosInstance from './axiosInstance';

export const callSearchApi = async (
  UserId,
  Countryid,
  Statedid,
  Districtid,
  cityId,
  MaritalStatusId,
  pageNumber,
  pageSize,
  GenderId,
  UserTypeId,
  isAbroads
) => {
  const { data = {} } = await axiosInstance.post(API.searchResults, {
    UserId,
    Countryid,
    Statedid,
    Districtid,
    cityId,
    MaritalStatusId,
    pageNumber,
    pageSize,
    GenderId,
    UserTypeId,
    isAbroad: isAbroads
  });
  return data;
};
