import { call, delay, put, race, take, takeLatest } from "redux-saga/effects";

import authService from "./authService";
import { actions } from "./authSlice";

const LOGIN_TIMEOUT_SEC = 5;

export const userSagas = [
  takeLatest(actions.loginRequest.type, userLoginSaga),
  takeLatest(actions.refreshTokenRequest.type, refreshUserTokenSaga),
  takeLatest(actions.logoutRequest.type, userLogoutSaga),
  takeLatest(actions.registerRequest.type, registerSaga),
];

function* registerSaga({ payload }) {
  try {
    yield put(actions.registerPending());

    yield call(authService.register, payload);
    yield put(actions.registerSuccess());
  } catch (e) {
    console.log(e);
    yield put(actions.registerFailure());
  }
}

function* userLoginSaga({ payload }) {
  try {
    yield put(actions.loginPending());
    const response = yield call(authService.login, payload);

    yield put(actions.loginSuccess(response.data.result.user));
  } catch (e) {
    console.log("Exception in userLoginSaga");
    yield put(actions.loginFailure());
  }
}

function* userLogoutSaga() {
  yield call(authService.logout);
  yield put(actions.logoutSuccess());
}

// function* userVerifySaga({ payload }) {
//   try {
//     //yield put(actions.verifyPending());
//     const { result, timeout } = yield race({
//       result: call(api.user.verify, payload),
//       timeout: delay(LOGIN_TIMEOUT_SEC * 1000),
//     });
//     if (timeout) {
//       throw new Error("Login timeout, check your network connection.");
//     }
//     yield put(result ? actions.verifySuccess(payload) : actions.verifyFailure());
//   } catch (e) {
//     yield put(actions.verifyFailure());
//   }
// }

// export function* userVerifyPromiseSaga({ payload }) {
//   try {
//     yield put(actions.verifyRequest(payload));
//     const data = yield take([actions.verifySuccess.type, actions.verifyFailure.type]);
//     return data.type === actions.verifySuccess.type;
//   } catch (e) {
//     yield put(notificationsActions.setMessage({ type: "error", message: e.message }));
//   }
// }

function* refreshUserTokenSaga({ payload }) {
  try {
    yield put(actions.refreshTokenPending());
    const { user, timeout } = yield race({
      user: call(authService.refreshtoken, payload),
      timeout: delay(LOGIN_TIMEOUT_SEC * 1000),
    });
    if (timeout) {
      throw new Error("Login timeout, check your network connection.");
    } else {
      yield put(actions.refreshTokenSuccess(user));
    }
  } catch (e) {
    console.log("Exception in userLoginSaga");
    yield put(actions.refreshTokenFailure());
  }
}
