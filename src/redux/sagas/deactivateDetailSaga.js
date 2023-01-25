import { call, put, takeLatest } from 'redux-saga/effects';
import { getDeactivateDetailsApi } from '../../services/deactivateDetailApi';
import {
  fetchDeactivateDetail,
  fetchDeactivateDetailError,
  fetchDeactivateDetailSuccess
} from '../modules/deactivateDetailsSlice';

function* getDeactivateDetails() {
  try {
    const deactivateDetails = yield call(getDeactivateDetailsApi);
    yield put(fetchDeactivateDetailSuccess(deactivateDetails));
  } catch {
    yield put(fetchDeactivateDetailError({ description: 'Something went worng' }));
  }
}

export default function* deactivateDetailsSaga() {
  yield takeLatest(fetchDeactivateDetail.type, getDeactivateDetails);
}
