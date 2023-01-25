import { createSelector } from 'reselect';
import { transformResponseForDropDown } from '../../utils/responseTranformHelpers';

export const getCountrySelector = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails) => {
    const { country = [] } = registerationDetails;

    return transformResponseForDropDown(country, 'CountryName');
  }
);
