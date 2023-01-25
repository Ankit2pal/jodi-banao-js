import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserRegisterationDetailsApi } from '../../services/userRegisterationDetailsApi';
import {
  fetchUserRegisterationDetails,
  fetchUserRegisterationDetailsError,
  fetchUserRegisterationDetailsSuccess
} from '../modules/userRegisterationDetails';

function* getUserRegisterationDetails({ payload }) {
  const { userId } = payload;
  if (userId) {
    try {
      const userRegistrationDetails = yield call(getUserRegisterationDetailsApi, userId);
      yield put(fetchUserRegisterationDetailsSuccess(userRegistrationDetails));
    } catch {
      yield put(fetchUserRegisterationDetailsError({ description: 'Something went worng' }));
    }
  }
}

export default function* userRegisterationDetailsSaga() {
  yield takeLatest(fetchUserRegisterationDetails, getUserRegisterationDetails);
}
