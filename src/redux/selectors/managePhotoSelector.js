import { createSelector } from 'reselect';

export const getPhotos = createSelector([(state) => state.userPhotos.data], (data = {}) => data);
export const getIsUploaded = createSelector(
  [(state) => state.userPhotos.isUploaded],
  (isUploaded = false) => isUploaded
);
export const getIsDeleted = createSelector(
  [(state) => state.userPhotos.isDeleted],
  (isDeleted = false) => isDeleted
);

export const checkIfUserPhotoDeleted = createSelector(
  [(state) => state.userPhotos.isError],
  (isError) => !isError
);

export const getMessage = createSelector([(state) => state.userPhotos.message], (message = '') => {
  return message;
});
