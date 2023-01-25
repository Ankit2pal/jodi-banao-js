import { call, put, select, takeLatest } from 'redux-saga/effects';
import { callSearchApi } from '../../services/searchResultsApi';
import { onSearchError, onSearchSubmit, onSearchSuccess } from '../modules/searchResultsSlice';
import { getUId, getUserRegisterationDetails } from '../selectors/userRegisterationDetails';
import { getRegisterationDetails } from '../selectors/registerationDetailsSelector';

function* doSearch({ payload }) {
  const { pageNumber = 1 } = payload;
  const userId = yield select(getUId);
  const userData = yield select(getUserRegisterationDetails);
  const userRegisteration = yield select(getRegisterationDetails);
  const { country, state, district, gender, city, userType, maritalStatus, isAbroad } = payload;
  let countryId = country?.id;
  let stateId = state?.id;
  let districtId = district?.Id;
  let cityId = city?.id;
  let maritalStatusId = maritalStatus?.Id;
  let isAbroads = isAbroad ? 1 : 0;
  let GenderId;
  if (gender) {
    GenderId = gender.Id;
  }
  if (!GenderId && userData.RoleId == 1) {
    const filterRes = userRegisteration.gender.filter((item) => {
      return item.Id !== userData.GenderId;
    });
    GenderId = filterRes[0].Id;
  }
  if (userData.RoleId == 2) {
    countryId = userData?.CountryId;
    stateId = userData?.state?.Id;
    districtId = userData?.district?.Id;
    cityId = userData?.city?.Id;
  }
  let UserTypeId;
  if (userType) UserTypeId = userType.Id;
  if ((countryId || isAbroads) && userId) {
    try {
      const searchResults = yield call(
        callSearchApi,
        userId,
        countryId,
        stateId,
        districtId,
        cityId,
        maritalStatusId,
        pageNumber,
        12,
        GenderId,
        UserTypeId,
        isAbroads
      );

      yield put(onSearchSuccess(searchResults));
    } catch (e) {
      const { response = {} } = e;
      const { data = {} } = response;
      yield put(onSearchError(data.Message || 'Something went wrong'));
    }
  } else {
    yield put(onSearchError('Something went wrong'));
  }
}

export default function* searchResultsSaga() {
  yield takeLatest(onSearchSubmit.type, doSearch);
}
