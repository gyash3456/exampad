import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATE, PENDING_STATE, SUCCESS_STATE, FAILURE_STATE } from '../constants';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    isLoggedIn: false,
    register: INITIAL_STATE,
    login: INITIAL_STATE,
    logout: INITIAL_STATE,
    refreshToken: INITIAL_STATE,
  },
  reducers: {
    registerRequest: () => ({ register: PENDING_STATE }),
    registerPending: () => ({ register: PENDING_STATE }),
    registerSuccess: () => ({
      register: SUCCESS_STATE,
    }),
    registerFailure: () => ({
      register: FAILURE_STATE,
    }),
    loginRequest: () => ({ login: PENDING_STATE }),
    loginPending: () => ({ login: PENDING_STATE }),
    loginSuccess: (state, { payload: result }) => ({
      accessToken: result.accessToken,
      isLoggedIn: true,
      login: SUCCESS_STATE,
    }),
    loginFailure: () => ({
      accessToken: null,
      isLoggedIn: false,
      login: FAILURE_STATE,
    }),

    logoutRequest: () => ({ logout: PENDING_STATE }),
    logoutSuccess: () => ({ accessToken: null, isLoggedIn: false, logout: SUCCESS_STATE }),
    verifyRequest: () => {},
    verifySuccess: (state, { payload: user }) => {
      return {
        user,
        loading: true,
        verifyPending: false,
      };
    },
    verifyFailure: () => {},
    refreshTokenRequest: () => ({ refreshToken: PENDING_STATE }),
    refreshTokenPending: () => ({ refreshToken: PENDING_STATE }),
    refreshTokenSuccess: (state, { payload: result }) => ({
      accessToken: result.data.accessToken,
      isLoggedIn: true,
      refreshToken: SUCCESS_STATE,
    }),
    refreshTokenFailure: () => ({
      accessToken: null,
      isLoggedIn: false,
      refreshToken: FAILURE_STATE,
    }),
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
