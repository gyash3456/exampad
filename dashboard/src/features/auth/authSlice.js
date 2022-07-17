import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    loading: false,
    isLoggedIn: false,
    errorVal: false,
    registerSuccess: false,
  },
  reducers: {
    registerRequest: () => {},
    registerPending: () => ({ accessToken: null, loading: true, registerSuccess: false, isLoggedIn: false }),
    registerSuccess: () => ({
      registerSuccess: true,
    }),
    registerFailure: () => ({
      accessToken: null,
      loading: false,
      isLoggedIn: false,
      registerSuccess: false,
      errorVal: true,
    }),
    loginRequest: () => {},
    loginPending: () => ({ accessToken: null, loading: true, isLoggedIn: false }),
    loginSuccess: (state, { payload: result }) => ({
      accessToken: result.accessToken,
      loading: false,
      isLoggedIn: true,
      errorVal: false,
    }),
    loginFailure: () => ({ accessToken: null, loading: false, isLoggedIn: false, errorVal: true }),

    logoutRequest: () => {},
    logoutSuccess: () => ({ accessToken: null, loading: false, isLoggedIn: false }),
    verifyRequest: () => {},
    verifySuccess: (state, { payload: user }) => {
      return {
        user,
        loading: true,
        verifyPending: false,
      };
    },
    verifyFailure: () => {},
    refreshTokenRequest: () => {},
    refreshTokenPending: () => ({ accessToken: null, loading: true, isLoggedIn: false }),
    refreshTokenSuccess: (state, { payload: result }) => {
      return {
        accessToken: result.data.accessToken,
        loading: false,
        isLoggedIn: true,
        errorVal: false,
      };
    },
    refreshTokenFailure: () => ({ accessToken: null, loading: false, isLoggedIn: false }),
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
