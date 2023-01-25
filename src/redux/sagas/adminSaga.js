import { put, takeLatest, call } from 'redux-saga/effects';
import { getAdminRequestApi } from '../../services/adminsApi';
import { adminRequest, adminError, adminSuccess } from '../modules/adminSlice';

function* getAdminRequest({ payload }) {
  const { userId } = payload;
  let reqData = {
    userId,
    pageNumber: 1,
    pageSize: 5
  };
  if (userId) {
    try {
      const data = yield call(getAdminRequestApi, reqData);
      yield put(adminSuccess(data));
    } catch {
      yield put(adminError({ description: 'Something went wrong' }));
    }
  }
}

export default function* adminSaga() {
  yield takeLatest(adminRequest, getAdminRequest);
}
