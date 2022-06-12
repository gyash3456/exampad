import { Navigate, Routes, Route } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import Blog from '../pages/Blog';
import User from '../pages/User';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';
import Products from '../pages/Products';
import DashboardApp from '../pages/DashboardApp';
import ProtectedRoute from './ProtectedRoute';

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      {/* Auth Pages */}
      <Route exact path="/login" element={<Login />} />

      {/*Main Routes*/}
      <Route path="/dashboard" name="Admin" element={<ProtectedRoute />}>
        <Route exact path="/dashboard" element={<DashboardLayout />}>
          <Route exact path="app" element={<DashboardApp />} />
          <Route exact path="user" element={<User />} />
        </Route>
      </Route>
      <Route element={<NotFound />} />
    </Routes>
  );
  // return useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { path: 'app', element: <DashboardApp /> },
  //       { path: 'user', element: <User /> },
  //       { path: 'products', element: <Products /> },
  //       { path: 'blog', element: <Blog /> },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     element: <LogoOnlyLayout />,
  //     children: [
  //       { path: '/', element: <Navigate to="/dashboard/app" /> },
  //       { path: 'login', element: <Login /> },
  //       { path: 'register', element: <Register /> },
  //       { path: '404', element: <NotFound /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   { path: '*', element: <Navigate to="/404" replace /> },
  // ]);
}
