import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllStateAPI, getCountryAPI } from '../../services/CountryStateApi';
import { getRegisterationDetailsApi } from '../../services/registerationDetailsApi';
import {
  fetchCountryDetails,
  fetchCountryDetailsSuccess,
  fetchRegisterationDetailsError,
  fetchRegisterationDetailsSuccess,
  fetchStateDetails,
  fetchStateDetailsSuccess
} from '../modules/registerationDetailsSlice';

function* getRegisterationDetails() {
  try {
    const registrationDetails = yield call(getRegisterationDetailsApi);
    const countryDetails = yield call(getCountryAPI);
    const stateDetails = yield call(getAllStateAPI);

    if (registrationDetails) yield put(fetchRegisterationDetailsSuccess(registrationDetails));
    if (countryDetails) yield put(fetchCountryDetailsSuccess(countryDetails));
    if (stateDetails) yield put(fetchStateDetailsSuccess(stateDetails));
  } catch {
    yield put(fetchRegisterationDetailsError({ description: 'Something went worng' }));
    yield put(fetchCountryDetailsSuccess({ description: 'Something went worng' }));
    yield put(fetchCountryDetailsSuccess({ description: 'Something went worng' }));
  }
}

export default function* registerationDetailsSaga() {
  yield takeLatest('registerationDetails/fetchRegisterationDetails', getRegisterationDetails);
  yield takeLatest(fetchCountryDetails, getRegisterationDetails);
  yield takeLatest(fetchStateDetails, getRegisterationDetails);
}
