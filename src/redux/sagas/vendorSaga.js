import { put, takeLatest, call } from 'redux-saga/effects';
import { getVendorRequestApi } from '../../services/vendorsApi';
import { vendorRequest, vendorError, vendorSuccess } from '../modules/vendorSlice';

function* getVendorRequest({ payload }) {
  const { userId } = payload;
  let reqData = {
    userId,
    pageNumber: 1,
    pageSize: 5
  };
  if (reqData) {
    try {
      const data = yield call(getVendorRequestApi, reqData);
      yield put(vendorSuccess(data));
    } catch {
      yield put(vendorError({ description: 'Something went wrong' }));
    }
  }
}

export default function* vendorSaga() {
  yield takeLatest(vendorRequest, getVendorRequest);
}
