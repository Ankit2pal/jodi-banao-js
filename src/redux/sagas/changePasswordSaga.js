import { call, put, takeLatest } from 'redux-saga/effects';
import { callChangePasswordApi } from '../../services/changePasswordApi';
import {
  onChangePasswordSubmit,
  onChangePasswordSubmitError,
  onChangePasswordSubmitSuccess
} from '../modules/changePasswordSlice';

function* doChangePasswordAction({ payload }) {
  const { NewPassword, OldPassword, UserId } = payload;
  if (NewPassword && OldPassword && UserId) {
    try {
      const forgotPasswordResponse = yield call(
        callChangePasswordApi,
        NewPassword,
        OldPassword,
        UserId
      );
      const { Message, Data, Status } = forgotPasswordResponse;
      if (Data && Data.uid) {
        yield put(
          onChangePasswordSubmitSuccess({ data: { uid: Data.uid }, message: Message, Status })
        );
      } else {
        yield put(
          onChangePasswordSubmitError({ data: { uid: Data.uid }, message: Message, Status })
        );
      }
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      yield put(onChangePasswordSubmitError({ data: { message }, message }));
    }
  }
}

export default function* changePasswordSaga() {
  yield takeLatest(onChangePasswordSubmit.type, doChangePasswordAction);
}
