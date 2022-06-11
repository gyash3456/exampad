import React, { Suspense, useCallback, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./features/auth/authSlice";

import Layout from "./layout/Index";

import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";

import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";
import Loader from "./pages/components/Loader";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const verifyUser = useCallback(() => {
    dispatch(actions.refreshTokenRequest());
    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyUser, 5 * 60 * 1000);
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Routes>
          {/* Auth Pages */}
          <Route exact path="/auth-success" element={<Success />} />
          <Route exact path="/auth-reset" element={<ForgotPassword />} />
          <Route exact path="/auth-register" element={<Register />} />
          <Route exact path="/auth-login" element={<Login />} />

          {/* Print Pages */}
          <Route exact path="/invoice-print/:id" element={<InvoicePrint />} />

          {/* Helper pages */}
          <Route exact path="/auths/terms" element={<Terms />} />
          <Route exact path="/auths/faq" element={<Faq />} />

          <Route exact path="/invoice-print" element={<InvoicePrint />} />

          {/*Error Pages*/}
          <Route exact path="/errors/404-classic" element={<Error404Classic />} />
          <Route exact path="/errors/504-modern" element={<Error504Modern />} />
          <Route exact path="/errors/404-modern" element={<Error404Modern />} />
          <Route exact path="/errors/504-classic" element={<Error504Classic />} />

          {/*Main Routes*/}
          <Route
            path="*"
            name="Admin"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
          <Route element={<RedirectAs404 />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
