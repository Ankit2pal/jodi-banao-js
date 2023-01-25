import { createSelector } from 'reselect';

export const getAdmins = createSelector([(state) => state.admins.data], (data = []) => data);
