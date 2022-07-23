import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { all } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import appReducer from './features/app/appSlice';
import { appSagas } from './features/app/appSaga';
import authReducer from './features/auth/authSlice';
import { authSagas } from './features/auth/authSaga';
import blogReducer from './features/blog/blogSlice';
import { blogSagas } from './features/blog/blogSaga';

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ serializableCheck: false, thunk: false }), sagaMiddleware];

function* rootSaga() {
  yield all([...appSagas, ...authSagas, ...blogSagas]);
}

const persistAppConfig = {
  key: 'app',
  storage,
  blacklist: ['accessToken'],
};

const persistBlogConfig = {
  key: 'blog',
  storage,
  blacklist: ['accessToken'],
};
const persistedAppReducer = persistReducer(persistAppConfig, appReducer);
const persistedBlogReducer = persistReducer(persistBlogConfig, blogReducer);

const reducer = {
  app: persistedAppReducer,
  auth: authReducer,
  blog: persistedBlogReducer,
};

export const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
