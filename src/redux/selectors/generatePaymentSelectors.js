import { createSelector } from 'reselect';

export const generatePayment = createSelector(
  [(state) => state.packages.data],
  (data = []) => data
);
