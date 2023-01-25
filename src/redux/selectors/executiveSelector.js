import { createSelector } from 'reselect';

export const getExecutive = createSelector(
  [(state) => state.executive.data.Result],
  (data = []) => data
);
