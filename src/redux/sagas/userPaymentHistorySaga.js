import { put, takeLatest, call } from 'redux-saga/effects';
import { getUserPaymentHistoryApi } from '../../services/usersPaymentHistoryAPi';
import {
  userPaymentHistoryRequest,
  userPaymentHistorySuccess,
  userPaymentHistoryError
} from '../modules/userPaymentHistorySlice';

function* getUserPaymentHistory({ payload }) {
  const { userId } = payload;
  let reqData = {
    userId
  };
  if (reqData) {
    try {
      const data = yield call(getUserPaymentHistoryApi, reqData);
      yield put(userPaymentHistorySuccess(data));
    } catch {
      yield put(userPaymentHistoryError({ description: 'Something went wrong' }));
    }
  }
}

export default function* userPaymentHistorySaga() {
  yield takeLatest(userPaymentHistoryRequest, getUserPaymentHistory);
}
