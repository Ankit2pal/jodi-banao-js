import { call, takeLatest, put } from 'redux-saga/effects';
import { deactivateApi } from '../../services/deactivateApi';
import {
  onDeactivateSubmit,
  onDeactivateSubmitSuccess,
  onDeactivateSubmitError
} from '../modules/deactivateSlice';

function* doDeactivate({ payload }) {
  const { UserId } = payload;
  if (UserId) {
    try {
      const deactivateResponse = yield call(deactivateApi, payload);
      const { Data, Message } = deactivateResponse;
      // window.location.replace('/');
      if (Data?.id) {
        yield put(onDeactivateSubmitSuccess({ data: { Data }, Message }));
      } else {
        yield put(onDeactivateSubmitError({ data: { Data }, Message }));
      }
    } catch (e) {
      const message = e.response?.data?.Message || 'Something went wrong';
      yield put(onDeactivateSubmitError({ data: { message }, message }));
    }
  }
}

export default function* deactivateSaga() {
  yield takeLatest(onDeactivateSubmit.type, doDeactivate);
}
