import { put, takeLatest, call } from 'redux-saga/effects';
import {
  getUserRequestApi,
  DeActiveUserRequestApi,
  ActiveUserRequestApi
} from '../../services/usersApi';
import { executiveRequest } from '../modules/executiveSlice';
import { vendorRequest } from '../modules/vendorSlice';
import {
  userRequest,
  userError,
  userSuccess,
  userDeActiveRequest,
  userDeActiveSuccess,
  userDeActiveError,
  userActiveRequest,
  userActiveSuccess,
  userActiveError
} from '../modules/userSlice';

function* getUserRequest({ payload }) {
  const { userId } = payload;
  let reqData = {
    userId,
    pageNumber: 1,
    pageSize: 5
  };
  if (reqData) {
    try {
      const data = yield call(getUserRequestApi, reqData);
      yield put(userSuccess(data));
    } catch {
      yield put(userError({ description: 'Something went wrong' }));
    }
  }
}

export default function* userSaga() {
  yield takeLatest(userRequest, getUserRequest);
}

function* DeActiveUserRequest({ payload }) {
  const { userId, loggedInUserId, userType } = payload;
  const reqData = {
    uId: userId,
    userId: loggedInUserId
  };
  if (userId) {
    try {
      const data = yield call(DeActiveUserRequestApi, reqData);
      yield put(userDeActiveSuccess(data));
      if (userType === 'e') {
        yield put(executiveRequest({ userId: loggedInUserId }));
      }
      if (userType === 'v') {
        yield put(vendorRequest({ userId: loggedInUserId }));
      }
      if (userType === 'u') {
        yield put(userRequest({ userId: loggedInUserId }));
      }
    } catch {
      yield put(userDeActiveError({ description: 'Something went wrong' }));
    }
  }
}

function* ActiveUserRequest({ payload }) {
  const { userId, loggedInUserId, userType } = payload;
  const reqData = {
    uId: userId,
    userId: loggedInUserId
  };
  if (userId) {
    try {
      const data = yield call(ActiveUserRequestApi, reqData);
      yield put(userActiveSuccess(data));
      if (userType === 'e') {
        yield put(executiveRequest({ userId: loggedInUserId }));
      }
      if (userType === 'v') {
        yield put(vendorRequest({ userId: loggedInUserId }));
      }
      if (userType === 'u') {
        yield put(userRequest({ userId: loggedInUserId }));
      }
    } catch {
      yield put(userActiveError({ description: 'Something went wrong' }));
    }
  }
}

export function* userDeActiveSaga() {
  yield takeLatest(userDeActiveRequest, DeActiveUserRequest);
}

export function* userActiveSaga() {
  yield takeLatest(userActiveRequest, ActiveUserRequest);
}
