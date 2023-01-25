import { put, takeLatest, call } from 'redux-saga/effects';
import {
  getPackagesRequestApi,
  createPackagesRequestApi,
  deletePackagesRequestApi,
  updatePackageApi,
  activatePackagesRequestApi
} from '../../services/packageListApi';
import {
  packageRequest,
  packageError,
  packageSuccess,
  createpackageRequest,
  createpackageSuccess,
  createpackageError,
  deletepackageRequest,
  deletepackageSuccess,
  deletepackageError,
  updatepackageRequest,
  updatepackageSuccess,
  updatepackageError
} from '../modules/packageSlice';

function* getPackageRequest({ payload }) {
  const { userId } = payload;
  if (userId) {
    try {
      const data = yield call(getPackagesRequestApi, userId);
      yield put(packageSuccess(data));
    } catch {
      yield put(packageError({ description: 'Something went wrong' }));
    }
  }
}

export default function* packageSaga() {
  yield takeLatest(packageRequest, getPackageRequest);
}

function* createPackageRequest({ payload }) {
  const { userId, PackageName, Cost, PackageTypeId, ValidityInMonths } = payload;
  if ((userId, PackageTypeId, Cost, PackageName, ValidityInMonths)) {
    try {
      const data1 = yield call(createPackagesRequestApi, payload);
      yield put(createpackageSuccess(data1));
    } catch {
      yield put(createpackageError({ description: 'Something went wrong' }));
    }
  }
}

export function* packageListSaga() {
  yield takeLatest(createpackageRequest, createPackageRequest);
}

function* deletePackageRequest({ payload }) {
  if (payload.Id) {
    try {
      let data;
      if (payload.isActive) {
        delete payload['isActive'];
        data = yield call(activatePackagesRequestApi, payload);
      } else {
        delete payload['isActive'];
        data = yield call(deletePackagesRequestApi, payload);
      }

      yield put(deletepackageSuccess(data));
      yield put(packageRequest({ userId: payload.UserId }));
    } catch {
      yield put(deletepackageError({ description: 'Something went wrong' }));
    }
  }
}

export function* deletepackageListSaga() {
  yield takeLatest(deletepackageRequest, deletePackageRequest);
}

function* updatePackageRequest({ payload }) {
  const { Id } = payload;
  if (Id) {
    try {
      const data = yield call(updatePackageApi, payload);
      if (data?.Status === 'success') {
        yield put(updatepackageSuccess(data));
        yield put(packageRequest({ userId: Id }));
      }
    } catch {
      yield put(updatepackageError({ description: 'Something went wrong' }));
    }
  }
}

export function* updatepackageListSaga() {
  yield takeLatest(updatepackageRequest, updatePackageRequest);
}
