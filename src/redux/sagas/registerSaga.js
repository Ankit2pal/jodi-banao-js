import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import { callRegisterApi } from '../../services/registerApi';
import { getFormattedValuesForRegisteration } from '../../utils/registerationHelpers';
import {
  onRegisterSubmit,
  onRegisterSubmitError,
  onRegisterSubmitSuccess
} from '../modules/registerSlice';

function* doRegister({ payload }) {
  const formattedValues = getFormattedValuesForRegisteration(payload);
  if (!isEmpty(formattedValues)) {
    try {
      const registerResponse = yield call(callRegisterApi, formattedValues);

      const { Message, Data } = registerResponse;
      if (Data && Data.id) {
        yield put(onRegisterSubmitSuccess({ data: { id: Data.id }, message: Message }));
      } else {
        yield put(onRegisterSubmitError({ data: { id: Data.id }, message: Message }));
      }
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      yield put(onRegisterSubmitError({ data: { message }, message }));
    }
  }
}

export default function* registerSaga() {
  yield takeLatest(onRegisterSubmit.type, doRegister);
}
