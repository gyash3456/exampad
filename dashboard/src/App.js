import React, { useCallback, useEffect } from 'react';
// routes
import Router from './routes/routes';

// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import { useDispatch, useSelector } from 'react-redux';
import { actions as authActions } from './features/auth/authSlice';
import { actions as appActions } from './features/app/appSlice';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.auth);
  const verifyUser = useCallback(() => {
    dispatch(authActions.refreshTokenRequest());
    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyUser, 5 * 60 * 1000);
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(appActions.loggedinUserRequest());
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
