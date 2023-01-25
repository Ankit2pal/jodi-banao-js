import { call, put, takeLatest } from 'redux-saga/effects';
import { callResetPasswordApi } from '../../services/resetPasswordApi';
import {
  onResetPasswordSubmit,
  onResetPasswordSubmitError,
  onResetPasswordSubmitSuccess
} from '../modules/resetPasswordSlice';

function* doResetPasswordAction({ payload }) {
  const { password, UID, userid } = payload;

  if (password && UID && userid) {
    try {
      const forgotPasswordResponse = yield call(callResetPasswordApi, password, UID, userid);
      const { Message, Data } = forgotPasswordResponse;
      if (Data && Data.uid) {
        yield put(onResetPasswordSubmitSuccess({ data: { uid: Data.uid }, message: Message }));
      } else {
        yield put(onResetPasswordSubmitError({ data: { uid: Data.uid }, message: Message }));
      }
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      yield put(onResetPasswordSubmitError({ data: { message }, message }));
    }
  }
}

export default function* forgotPasswordSaga() {
  yield takeLatest(onResetPasswordSubmit.type, doResetPasswordAction);
}
