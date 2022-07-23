import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loggedinUser: null,
    loading: false,
    errorVal: false,
    isAppLoad: false,
  },
  reducers: {
    loggedinUserRequest: () => ({ isAppLoad: false }),
    loggedinUserPending: () => ({ loggedinUser: null, loading: true, isAppLoad: false }),
    loggedinUserSuccess: (state, { payload }) => ({
      loggedinUser: payload,
      loading: true,
      isAppLoad: true,
    }),
    loggedinUserFailure: () => ({
      loggedinUser: null,
      loading: false,
      errorVal: true,
      isAppLoad: true,
    }),
  },
});

export const actions = appSlice.actions;
export default appSlice.reducer;
