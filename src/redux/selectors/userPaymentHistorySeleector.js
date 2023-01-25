import { createSelector } from 'reselect';

export const getUsersHistory = createSelector(
  [(state) => state.usersPaymentHistory.data],
  (data = []) => data
);
