import { createSelector } from 'reselect';

const getViewedProfiles = createSelector(
  [(state) => state.adminDashboard.ViewedProfiles],
  (ViewedProfiles = []) => ViewedProfiles
);

const getAdminPackageDetail = createSelector(
  [(state) => state.adminDashboard.adminPackageDetail],
  (adminPackageDetail = []) => adminPackageDetail
);

export { getViewedProfiles, getAdminPackageDetail };
