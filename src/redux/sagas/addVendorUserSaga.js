import { call, put, takeLatest } from 'redux-saga/effects';
import { addVendorUserApi } from '../../services/addVendorUser';
import {
  addVendorUser,
  addVendorUserError,
  addVendorUserSuccess
} from '../modules/vendorByUserAdd';

function* addVendorUsers({ payload }) {
  if (payload) {
    try {
      const data = yield call(addVendorUserApi, payload);
      yield put(addVendorUserSuccess(data));
    } catch {
      yield put(addVendorUserError({ description: 'Something went wrong' }));
    }
  }
}

export default function* addVendorUserSaga() {
  yield takeLatest(addVendorUser, addVendorUsers);
}
