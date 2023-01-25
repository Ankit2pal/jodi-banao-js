import { put, takeLatest, call } from 'redux-saga/effects';
import { getExecutiveRequestApi } from '../../services/executiveApi';
import { executiveRequest, executiveSuccess, executiveError } from '../modules/executiveSlice';

function* getExecutiveRequest({ payload }) {
  const { userId } = payload;
  let reqData = {
    userId,
    pageNumber: 1,
    pageSize: 5
  };
  if (reqData) {
    try {
      const data = yield call(getExecutiveRequestApi, reqData);
      yield put(executiveSuccess(data));
    } catch {
      yield put(executiveError({ description: 'Something went wrong' }));
    }
  }
}

export default function* vendorSaga() {
  yield takeLatest(executiveRequest, getExecutiveRequest);
}
