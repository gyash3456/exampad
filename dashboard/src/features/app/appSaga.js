import { call, delay, put, race, take, takeLatest } from 'redux-saga/effects';

import appService from './appService';
import { actions } from './appSlice';

export const appSagas = [takeLatest(actions.loggedinUserRequest.type, getLoggedInUserSaga)];

function* getLoggedInUserSaga() {
  try {
    yield put(actions.loggedinUserPending());
    const response = yield call(appService.getLoggedInUser);
    yield put(actions.loggedinUserSuccess(response));
  } catch (e) {
    console.log('Exception in getLoggedInUserSaga');
    yield put(actions.loggedinUserFailure());
  }
}
