import { createSelector } from 'reselect';

export const getMessage = createSelector(
  [(state) => state.loginDetails.message],
  (message = '') => {
    return message;
  }
);

export const getUID = createSelector([(state) => state.loginDetails.data.UserId], (UserId = '') => {
  return UserId;
});

export const checkIfLoginWasSuccess = createSelector(
  [(state) => state.loginDetails.isError],
  (isError) => !isError
);
