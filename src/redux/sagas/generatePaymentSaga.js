import { call, put, takeLatest } from 'redux-saga/effects';
import { generatePaymentApi } from '../../services/generatePaymentApi';

import {
  fetchGeneratePaymentApi,
  fetchGeneratePaymentApiSuccess,
  fetchGeneratePaymentApiError
} from '../modules/generatePaymentApiSlice';

function* generatePaymentData(payload) {
  try {
    const generatePaymentDetails = yield call(generatePaymentApi, payload);
    yield put(fetchGeneratePaymentApiSuccess(generatePaymentDetails));
  } catch {
    yield put(fetchGeneratePaymentApiError({ description: 'Something went worng' }));
  }
}

export default function* generatePaymentSaga() {
  yield takeLatest(fetchGeneratePaymentApi.type, generatePaymentData);
}
