import axios from 'axios';
import { transformResponseForCountry } from '../utils/responseTranformHelpers';

const apiKey = 'bkVmNUxPdGtRYTJiZlB6WURPMWN5M0E5RGJNQ3pOMk1ra3B4UEcxQQ==';
export const getCountryAPI = async () => {
  const config = {
    method: 'get',
    url: 'https://api.countrystatecity.in/v1/countries',
    headers: {
      'X-CSCAPI-KEY': apiKey
    }
  };
  let { data = {} } = await axios(config);
  data = transformResponseForCountry(data);
  return data;
};

export const getStateAPI = async (cid) => {
  const config = {
    method: 'get',
    url: `https://api.countrystatecity.in/v1/countries/${cid}/states`,
    headers: {
      'X-CSCAPI-KEY': apiKey
    }
  };
  let { data = {} } = await axios(config);
  data = transformResponseForCountry(data);
  return data;
};

export const getAllStateAPI = async () => {
  const config = {
    method: 'get',
    url: `https://api.countrystatecity.in/v1/states`,
    headers: {
      'X-CSCAPI-KEY': apiKey
    }
  };
  let { data = {} } = await axios(config);
  data = transformResponseForCountry(data);
  return data;
};

export const getCitiesAPI = async (cid, state) => {
  const config = {
    method: 'get',
    url: `https://api.countrystatecity.in/v1/countries/${cid}/states/${state}/cities`,
    headers: {
      'X-CSCAPI-KEY': apiKey
    }
  };
  let { data = {} } = await axios(config);
  data = transformResponseForCountry(data);
  return data;
};
