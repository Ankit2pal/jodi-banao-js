import { isEmpty } from 'lodash';
import { call, takeLatest, put } from 'redux-saga/effects';
import { callCompleteRegisterationApi } from '../../services/completeRegisterationApi';
import { getFormattedValuesForCompleteRegisteration } from '../../utils/completeRegisterationHelpers';
import {
  onSubmitDetails,
  onSubmitDetailsError,
  onSubmitDetailsSuccess
} from '../modules/completeRegisterationSlice';
import { fetchUserRegisterationDetails } from '../modules/userRegisterationDetails';

function* doSubmit({ payload }) {
  let formattedValues;
  if (!payload?.isComplete) {
    formattedValues = getFormattedValuesForCompleteRegisteration(payload);
  } else {
    formattedValues = payload;
  }

  if (!isEmpty(formattedValues)) {
    try {
      const data = yield call(callCompleteRegisterationApi, formattedValues);
      const { Data = {} } = data;
      yield put(onSubmitDetailsSuccess(Data));
      yield put(fetchUserRegisterationDetails({ userId: Data.id }));
    } catch (e) {
      const { response = {} } = e;
      const { data = {} } = response;
      yield put(onSubmitDetailsError(data.Message || 'Something went wrong'));
    }
  }
}

export default function* completeRegisterationSaga() {
  yield takeLatest(onSubmitDetails.type, doSubmit);
}
