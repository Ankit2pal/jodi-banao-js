import { createSelector } from 'reselect';

export const getDeactivateMessage = createSelector(
  [(state) => state.deactivate.message],
  (message = '') => {
    return message;
  }
);

export const checkIfDeactivateSuccess = createSelector(
  [(state) => state.deactivate.isError],
  (isError) => !isError
);
