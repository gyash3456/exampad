import { call, delay, put, race, take, takeLatest } from "redux-saga/effects";

import authService from "../../services/authService";
import { actions } from "./slice";

const LOGIN_TIMEOUT_SEC = 5;

export const userSagas = [
  takeLatest(actions.loginRequest.type, userLoginSaga),
  // takeLatest(actions.logoutRequest.type, userLogoutSaga),
  // takeLatest(actions.verifyRequest.type, userVerifySaga),
];

function* userLoginSaga({ payload }) {
  try {
    yield put(actions.loginPending());
    const { user, timeout } = yield race({
      user: call(authService.login, payload),
      timeout: delay(LOGIN_TIMEOUT_SEC * 1000),
    });
    if (timeout) {
      throw new Error("Login timeout, check your network connection.");
    } else {
      yield put(actions.loginSuccess(user));
    }
  } catch (e) {
    console.log("Exception in userLoginSaga");
    yield put(actions.loginFailure());
  }
}

// function* userLogoutSaga() {
//   localStorage.removeItem("account");
//   yield put(actions.logoutSuccess());
// }

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
