import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { all } from "redux-saga/effects";
import userReducer from "./features/auth/authSlice";
import { userSagas } from "./features/auth/authSaga";
import blogReducer from "./features/blog/blogSlice";
import { blogSagas } from "./features/blog/blogSaga";

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ serializableCheck: false, thunk: false }), sagaMiddleware];

function* rootSaga() {
  yield all([...userSagas, ...blogSagas]);
}

const reducer = {
  user: userReducer,
  blog: blogReducer,
};

const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
