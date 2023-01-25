import { createSelector } from 'reselect';

export const getForgotPasswordMessage = createSelector(
  [(state) => state.forgotPasswordDetails.message],
  (message = '') => {
    return message;
  }
);

export const checkIfForgotPasswordWasSuccess = createSelector(
  [(state) => state.forgotPasswordDetails.isError],
  (isError) => !isError
);
