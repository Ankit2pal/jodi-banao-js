import { createSelector } from 'reselect';

export const getMessage = createSelector(
  [(state) => state.resetPasswordDetails.message],
  (message = '') => {
    return message;
  }
);

export const checkIfResetPasswordWasSuccess = createSelector(
  [(state) => state.resetPasswordDetails.isError],
  (isError) => !isError
);
