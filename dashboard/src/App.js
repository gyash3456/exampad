import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";

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

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Routes>
          {/* Auth Pages */}
          <Route exact path={`${process.env.PUBLIC_URL}/auth-success`} element={<Success />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/auth-reset`} element={<ForgotPassword />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/auth-register`} element={<Register />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} element={<Login />}></Route>

          {/* Print Pages */}
          <Route exact path={`${process.env.PUBLIC_URL}/invoice-print/:id`} element={<InvoicePrint />}></Route>

          {/* Helper pages */}
          <Route exact path={`${process.env.PUBLIC_URL}/auths/terms`} element={<Terms />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/auths/faq`} element={<Faq />}></Route>

          <Route exact path={`${process.env.PUBLIC_URL}/invoice-print`} element={<InvoicePrint />}></Route>

          {/*Error Pages*/}
          <Route exact path={`${process.env.PUBLIC_URL}/errors/404-classic`} element={<Error404Classic />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/errors/504-modern`} element={<Error504Modern />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/errors/404-modern`} element={<Error404Modern />}></Route>
          <Route exact path={`${process.env.PUBLIC_URL}/errors/504-classic`} element={<Error504Classic />}></Route>

          {/*Main Routes*/}
          <Route
            path="/"
            name="Admin"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
          <Route element={<RedirectAs404 />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
