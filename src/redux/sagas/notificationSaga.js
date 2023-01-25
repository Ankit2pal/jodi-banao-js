import { call, put, takeLatest } from 'redux-saga/effects';
import { getNotificationApi } from '../../services/getNotificationApi';
import {
  notificationRequest,
  notificationError,
  notificationSuccess
} from '../modules/notificationSlice';

function* getNotificationRequest({ payload }) {
  const { UserId } = payload;
  if (UserId !== '') {
    try {
      const data = yield call(getNotificationApi, UserId);
      yield put(notificationSuccess(data));
    } catch {
      yield put(notificationError({ description: 'Something went worng' }));
    }
  }
}

export default function* notificationSaga() {
  yield takeLatest(notificationRequest, getNotificationRequest);
}
