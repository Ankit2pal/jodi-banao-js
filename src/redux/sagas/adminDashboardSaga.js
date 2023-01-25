import { call, put, takeLatest } from 'redux-saga/effects';
import { getViewedProfilesApi, getAdminPackageDetailApi } from '../../services/adminDashboardApi';
import {
  getViewedProfilesRequest,
  getViewedProfilesError,
  getViewedProfilesSuccess,
  getAdminPackageRequest,
  getAdminPackageError,
  getAdminPackageSuccess
} from '../modules/adminDashboardSlice';

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

function* getAdminPackageDetail({ payload }) {
  try {
    const adminPackageDetail = yield call(getAdminPackageDetailApi, payload);
    yield put(getAdminPackageSuccess(adminPackageDetail));
  } catch {
    yield put(getAdminPackageError({ description: 'Something went worng' }));
  }
}

export function* getAdminPackageSaga() {
  yield takeLatest(getAdminPackageRequest, getAdminPackageDetail);
}
