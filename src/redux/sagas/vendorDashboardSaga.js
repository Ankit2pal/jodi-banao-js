import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getViewedProfilesApi, getVendorPackageDetailApi } from '../../services/vendorDashboardApi';
import {
  getViewedProfilesRequest,
  getViewedProfilesError,
  getViewedProfilesSuccess,
  getVendorPackageRequest,
  getVendorPackageError,
  getVendorPackageSuccess
} from '../modules/vendorDashboardSlice';
import { getUId } from '../selectors/userRegisterationDetails';

function* getViewedProfiles({ payload }) {
  try {
    const registrationDetails = yield call(getViewedProfilesApi, payload);
    yield put(getViewedProfilesSuccess(registrationDetails));
  } catch {
    yield put(getViewedProfilesError({ description: 'Something went worng' }));
  }
}

export default function* getViewedProfilesSaga() {
  yield takeLatest(getViewedProfilesRequest, getViewedProfiles);
}

function* getVendorPackageDetail() {
  const userId = yield select(getUId);
  try {
    const vendorPackageDetail = yield call(getVendorPackageDetailApi, userId);
    yield put(getVendorPackageSuccess(vendorPackageDetail));
  } catch {
    yield put(getVendorPackageError({ description: 'Something went worng' }));
  }
}

export function* getVendorPackageSaga() {
  yield takeLatest(getVendorPackageRequest, getVendorPackageDetail);
}
