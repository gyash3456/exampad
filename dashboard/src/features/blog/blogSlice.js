import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE, PENDING_STATE, SUCCESS_STATE, FAILURE_STATE } from '../constants';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    categories: null,
    slug: '',
    post: {},
    createPost: { ...INITIAL_STATE },
    updatePost: { ...INITIAL_STATE },
    getPostBySlug: { ...INITIAL_STATE },
  },
  reducers: {
    createPostRequest: () => ({ createPost: { ...PENDING_STATE }, slug: '' }),
    createPostPending: () => ({ createPost: { ...PENDING_STATE }, slug: '' }),
    createPostSuccess: (state, { payload }) => ({
      createPost: { ...SUCCESS_STATE },
      slug: payload.post.slug,
    }),
    createPostFailure: () => ({ createPost: { ...FAILURE_STATE }, slug: '' }),
    getPostBySlugRequest: () => ({ getPostBySlug: { ...PENDING_STATE }, slug: '' }),
    getPostBySlugPending: () => ({ getPostBySlug: { ...PENDING_STATE }, slug: '' }),
    getPostBySlugSuccess: (state, { payload }) => ({ getPostBySlug: { ...SUCCESS_STATE }, post: payload }),
    getPostBySlugFailure: () => ({ getPostBySlug: { ...FAILURE_STATE }, slug: '' }),
    updatePostRequest: () => ({ updatePost: { ...PENDING_STATE }, slug: '' }),
    updatePostPending: () => ({ updatePost: { ...PENDING_STATE }, slug: '' }),
    updatePostSuccess: (state, { payload }) => ({ updatePost: { ...SUCCESS_STATE }, slug: payload.post.slug }),
    updatePostFailure: () => ({ updatePost: { ...FAILURE_STATE }, slug: '' }),
    categoriesRequest: () => {},
    categoriesPending: () => ({ categories: null, loading: true }),
    categoriesSuccess: (state, { payload: categories }) => ({
      categories,
      loading: false,
    }),
    categoriesFailure: () => ({ categories: null, loading: false, errorVal: true }),
  },
});

export const actions = blogSlice.actions;
export default blogSlice.reducer;
