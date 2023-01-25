import { call, put, takeLatest } from 'redux-saga/effects';
import { editUserProfileAPI } from '../../services/editUserProfile';
import {
  fetchEditProfile,
  fetchEditProfileError,
  fetchEditProfileSuccess
} from '../modules/editProfileSlice';
import { fetchUserRegisterationDetails } from '../modules/userRegisterationDetails';

function* editUserInfo({ payload }) {
  if (payload) {
    try {
      const data = yield call(editUserProfileAPI, payload);
      yield put(fetchEditProfileSuccess(data));
      yield put(fetchUserRegisterationDetails({ userId: payload?.isModifiedBy }));
    } catch (e) {
      console.log(e);
      yield put(fetchEditProfileError({ description: 'Something went wrong' }));
    }
  }
}

export default function* editUserSaga() {
  yield takeLatest(fetchEditProfile, editUserInfo);
}
