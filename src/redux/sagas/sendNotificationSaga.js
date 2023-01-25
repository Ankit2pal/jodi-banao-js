import { call, put, takeLatest } from 'redux-saga/effects';
import { sendNotificationAPI } from '../../services/notificationApi';
import {
  sendNotificationRequest,
  sendNotificationSuccess,
  sendNotificationError
} from '../modules/sendNotificationSlice';
function* sendNotificationReq({ payload }) {
  try {
    const data = yield call(sendNotificationAPI, payload);
    yield put(sendNotificationSuccess(data));
  } catch {
    yield put(sendNotificationError({ description: 'Something went worng' }));
  }
}
export default function* sendNotificationSaga() {
  yield takeLatest(sendNotificationRequest, sendNotificationReq);
}
