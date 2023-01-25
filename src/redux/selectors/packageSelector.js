import { createSelector } from 'reselect';
import { transformResponseForDropDown } from '../../utils/responseTranformHelpers';

export const getPackages = createSelector([(state) => state.packages.data], (data = []) => data);
export const createPackages = createSelector([(state) => state.packages.data], (data = {}) => data);
export const deletePackages = createSelector(
  [(state) => state.packages.data?.[0]?.Package],
  (data = []) => data
);
export const updatePackages = createSelector(
  [(state) => state.packages.data?.[0]?.Package],
  (data = []) => data
);

export const getPackage = createSelector(
  [(state) => state.packageDetails.data],
  (packageDetail) => {
    return transformResponseForDropDown(packageDetail, 'PackageType1');
  }
);
export const getPlan = createSelector(
  [(state) => state.packageDetails.data[0]],
  (packageDetail) => {
    if (packageDetail) {
      return transformResponseForDropDown(packageDetail?.Package, 'PackageType1');
    } else return [];
  }
);
