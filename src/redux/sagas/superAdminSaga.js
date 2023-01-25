import { call, put, takeLatest } from 'redux-saga/effects';
import { getViewedProfilesApi, getSuperAdminPackageDetailApi } from '../../services/superAdminApi';
import {
  getViewedProfilesRequest,
  getViewedProfilesSuccess,
  getViewedProfilesError,
  getSuperAdminPackageRequest,
  getSuperAdminPackageSuccess,
  getSuperAdminPackageError
} from '../modules/superAdminSlice';

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

function* getSuperAdminPackageDetail({ payload }) {
  try {
    const superadminPackageDetail = yield call(getSuperAdminPackageDetailApi, payload);
    yield put(getSuperAdminPackageSuccess(superadminPackageDetail));
  } catch {
    yield put(getSuperAdminPackageError({ description: 'Something went worng' }));
  }
}

export function* getSuperAdminPackageSaga() {
  yield takeLatest(getSuperAdminPackageRequest, getSuperAdminPackageDetail);
}
