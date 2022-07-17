import { call, delay, put, race, take, takeLatest } from 'redux-saga/effects';

import blogService from './blogService';
import { actions } from './blogSlice';

export const blogSagas = [
  takeLatest(actions.createPostRequest.type, createPostSaga),
  takeLatest(actions.categoriesRequest.type, categoriesSaga),
];

function* createPostSaga({ payload }) {
  console.log('***payload', payload);
  try {
    yield put(actions.createPostPending());

    const response = yield call(blogService.createPost, payload);
    console.log('***response', response);

    //yield put(actions.createPostSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.createPostFailure());
  }
}

function* categoriesSaga({ payload }) {
  try {
    yield put(actions.categoriesPending());

    const response = yield call(blogService.categories, payload);
    yield put(actions.categoriesSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.categoriesFailure());
  }
}
