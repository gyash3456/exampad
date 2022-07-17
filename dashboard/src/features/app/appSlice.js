import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loggedinUser: null,
    loading: false,
    errorVal: false,
  },
  reducers: {
    loggedinUserRequest: () => {},
    loggedinUserPending: () => ({ loggedinUser: null, loading: true }),
    loggedinUserSuccess: (state, { payload }) => ({
      loggedinUser: payload,
      loading: true,
    }),
    loggedinUserFailure: () => ({
      loggedinUser: null,
      loading: false,
      errorVal: true,
    }),
  },
});

export const actions = appSlice.actions;
export default appSlice.reducer;
