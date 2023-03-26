import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import ProtectedRoutes from './router/protected.router';
import AdminRoutes from './router/admin.router';
import PublicRoutes from './router/public.router';
import TeacherRoute from './router/teacher.router';
import { useSelector } from 'react-redux';
import { authSelector, relogin } from './store/slices/authSlice';
import { useAppDispatch } from './store/store';
import PageNotFound from './pages/PageNotFound';
import RegisterPages from './pages/RegisterPages';
import AdminActivityDashboard from './pages/AdminActivityDashboard';
import AdminRequestDashboard from './pages/AdminRequestDashboard';
import TeacherHome from './pages/TeacherHome';
import AdminAddActivity from './pages/AdminAddActivity';
import TeacherKPIDetail from './pages/TeacherKPIDetail';

export default function App() {
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(relogin());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <Route
          path="/"
          element={<ProtectedRoutes isAuthented={authReducer.isAuthented} />}
        >
          <Route
            path="/"
            element={<AdminRoutes isAdmin={authReducer.isAdmin} />}
          >
            <Route
              path="/admin-request-dashboard"
              element={<AdminRequestDashboard />}
            />
            <Route path="/admin-add-activity" element={<AdminAddActivity />} />
            {/* <Route path="/" element={<TeacherHome />} /> */}
            <Route
              path="/admin-activity-dashboard"
              element={<AdminActivityDashboard />}
            />
            <Route
              path="/"
              element={<Navigate to="/admin-activity-dashboard" />}
            />
          </Route>
          {/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          <Route
            path="/"
            element={<TeacherRoute isTeacher={authReducer.isTeacher} />}
          >
            <Route path="/teacherhome" element={<TeacherHome />} />
            <Route path="/teacher/kpi/:id" element={<TeacherKPIDetail />} />
            <Route path="/" element={<Navigate to="/teacherhome" />} />
          </Route>
        </Route>

        <Route
          path="/"
          element={<PublicRoutes isAuthented={authReducer.isAuthented} />}
        >
          <Route path="/login" element={<LoginPages />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />

          <Route path="/register" element={<RegisterPages />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/pagenotfound" />} />
        </Route>
        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      </Routes>
    </div>
  );
}
