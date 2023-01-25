import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteUserPhotoApi,
  getUserPhotosApi,
  uploadFilesApi
} from '../../services/managePhotosApi';
import {
  getPhotosRequest,
  getPhotosSuccess,
  getPhotosError,
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileError,
  deletePhotosRequest,
  deletePhotosSuccess,
  deletePhotosError
} from '../modules/managePhotoSlice';

function* getUserPhotos({ payload }) {
  const { userId } = payload;
  if (userId) {
    try {
      const data = yield call(getUserPhotosApi, userId);
      yield put(getPhotosSuccess(data));
    } catch {
      yield put(getPhotosError({ description: 'Something went wrong' }));
    }
  }
}

function* deleteUserPhotos({ payload }) {
  const imageId = payload;
  if (imageId) {
    try {
      const data = yield call(deleteUserPhotoApi, imageId);
      yield put(deletePhotosSuccess(data));
    } catch {
      yield put(deletePhotosError({ message: 'Something went wrong' }));
    }
  }
}

function* uploadPhotos(payload) {
  if (!isEmpty(payload)) {
    try {
      const uploadFilesResponse = yield call(uploadFilesApi, payload);

      const { Message, Data } = uploadFilesResponse;
      if (Data && Data.id) {
        yield put(uploadFileSuccess({ data: { id: Data.id }, message: Message }));
      } else {
        yield put(uploadFileError({ data: { id: Data.id }, message: Message }));
      }
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      yield put(uploadFileError({ data: { message }, message }));
    }
  }
}
export function* userPhotosUploadSaga() {
  yield takeLatest(uploadFileRequest, uploadPhotos);
}
export default function* userPhotosSaga() {
  yield takeLatest(getPhotosRequest, getUserPhotos);
}
export function* userPhotosDeleteSaga() {
  yield takeLatest(deletePhotosRequest, deleteUserPhotos);
}
