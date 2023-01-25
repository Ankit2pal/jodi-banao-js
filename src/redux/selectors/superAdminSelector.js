import { createSelector } from 'reselect';

const getViewedProfiles = createSelector(
  [(state) => state.vendorDashboard.ViewedProfiles],
  (ViewedProfiles = []) => ViewedProfiles
);

const getSuperAdminPackageDetail = createSelector(
  [(state) => state.superAdmin.superAdminPackageDetail],
  (superAdminPackageDetail = []) => superAdminPackageDetail
);

export { getViewedProfiles, getSuperAdminPackageDetail };
