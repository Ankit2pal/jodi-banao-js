import { createSelector } from 'reselect';

export const getVendors = createSelector(
  [(state) => state.vendors.data.Result],
  (data = []) => data
);
