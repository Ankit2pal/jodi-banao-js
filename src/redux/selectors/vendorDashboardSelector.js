import { createSelector } from 'reselect';

const getViewedProfiles = createSelector(
  [(state) => state.vendorDashboard.ViewedProfiles],
  (ViewedProfiles = []) => ViewedProfiles
);

const getVendorPackageDetail = createSelector(
  [(state) => state.vendorDashboard.vendorPackageDetail],
  (vendorPackageDetail = []) => vendorPackageDetail
);

export { getViewedProfiles, getVendorPackageDetail };
