import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./features/auth/slice";
import { userSagas } from "./features/auth/saga";
import { all } from "redux-saga/effects";

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ serializableCheck: false, thunk: false }), sagaMiddleware];

function* rootSaga() {
  yield all([...userSagas]);
}

const reducer = {
  user: userReducer,
};

const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
