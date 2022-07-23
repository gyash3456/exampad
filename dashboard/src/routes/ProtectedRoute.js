import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ path: pathname }} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
