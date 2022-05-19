import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    isLoggedIn: false,
    errorVal: false,
    registerSuccess: false,
    //verifyPending: false
  },
  reducers: {
    registerRequest: () => {},
    registerPending: () => ({ user: null, loading: true, registerSuccess: false, isLoggedIn: false }),
    registerSuccess: () => ({
      registerSuccess: true,
    }),
    registerFailure: () => ({
      user: null,
      loading: false,
      isLoggedIn: false,
      registerSuccess: false,
      errorVal: true,
    }),
    loginRequest: () => {},
    loginPending: () => ({ user: null, loading: true, isLoggedIn: false }),
    loginSuccess: (state, { payload: user }) => ({
      user,
      loading: false,
      isLoggedIn: true,
      errorVal: false,
    }),
    loginFailure: () => ({ user: null, loading: false, isLoggedIn: false, errorVal: true }),

    logoutRequest: () => {},
    logoutSuccess: () => ({ user: null, loading: false, isLoggedIn: false }),
    verifyRequest: () => {},
    //verifyPending: state => ({ ...state, verifyPending: true }),
    verifySuccess: (state, { payload: user }) => {
      console.log("verifySuccess REDUCER", user);
      return {
        user,
        loading: true,
        verifyPending: false,
      };
    },
    verifyFailure: () => {},
    refreshTokenRequest: () => {},
    refreshTokenPending: () => ({ user: null, loading: true, isLoggedIn: false }),
    refreshTokenSuccess: (state, { payload: user }) => ({
      user,
      loading: false,
      isLoggedIn: true,
      errorVal: false,
    }),
    refreshTokenFailure: () => ({ user: null, loading: false, isLoggedIn: false }),
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
