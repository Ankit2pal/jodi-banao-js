import { call, put, takeLatest } from 'redux-saga/effects';
import { getPackageDetailsApi } from '../../services/packagesApi';

import {
  fetchPackagesDetail,
  fetchPackagesDetailError,
  fetchPackagesDetailSuccess
} from '../modules/packagesSlice';

function* getPackageDetails() {
  try {
    const packageDetails = yield call(getPackageDetailsApi);
    yield put(fetchPackagesDetailSuccess(packageDetails));
  } catch {
    yield put(fetchPackagesDetailError({ description: 'Something went worng' }));
  }
}

export default function* packagesDetailSaga() {
  yield takeLatest(fetchPackagesDetail.type, getPackageDetails);
}
