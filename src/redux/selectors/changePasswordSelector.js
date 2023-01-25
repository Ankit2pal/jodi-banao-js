import { createSelector } from 'reselect';

export const getChangeMessage = createSelector(
  [(state) => state.changePasswordDetails.message],
  (message = '') => {
    return message;
  }
);

export const checkIfChangePasswordWasSuccess = createSelector(
  [(state) => state.changePasswordDetails.isError],
  (isError) => !isError
);

export const checkPassChange = createSelector(
  [(state) => state.changePasswordDetails.Status],
  (Status = '') => {
    return Status;
  }
);
