import { call, delay, put, race, take, takeLatest } from 'redux-saga/effects';

import blogService from './blogService';
import { actions } from './blogSlice';

export const blogSagas = [
  takeLatest(actions.createPostRequest.type, createPostSaga),
  takeLatest(actions.getPostBySlugRequest.type, getPostBySlugSaga),
  takeLatest(actions.categoriesRequest.type, categoriesSaga),
];

function* createPostSaga({ payload }) {
  try {
    yield put(actions.createPostPending());

    const response = yield call(blogService.createPost, payload);

    yield put(actions.createPostSuccess(response.data));
  } catch (e) {
    console.log(e);
    yield put(actions.createPostFailure());
  }
}

function* getPostBySlugSaga({ payload }) {
  try {
    yield put(actions.getPostBySlugPending());

    const response = yield call(blogService.getPostBySlug, payload);
    yield put(actions.getPostBySlugSuccess(response.data));
  } catch (e) {
    console.log(e);
    yield put(actions.getPostBySlugFailure());
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
