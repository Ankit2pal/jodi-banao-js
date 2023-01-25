import { createSelector } from 'reselect';

export const getNotifications = createSelector(
  [(state) => state.notification.data],
  (data = {}) => data
);
