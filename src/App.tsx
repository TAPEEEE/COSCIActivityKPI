import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import ProtectedRoutes from './router/protected.router';
import AdminRoutes from './router/admin.router';
import PublicRoutes from './router/public.router';
import { useSelector } from 'react-redux';
import { authSelector, relogin } from './store/slices/authSlice';
import { useAppDispatch } from './store/store';
import PageNotFound from './pages/PageNotFound';
import RegisterPages from './pages/RegisterPages';
import AdminActivityDashboard from './pages/AdminActivityDashboard';
import AdminRequestDashboard from './pages/AdminRequestDashboard';
import TeacherHome from './pages/TeacherHome';

export default function App() {
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(relogin());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        {/* ******** ProtectTeacher Route ******* */}
        <Route
          path="/"
          element={<ProtectedRoutes isAuthented={authReducer.isAuthented} />}
        >
          <Route path="/teacher-home" element={<TeacherHome />} />
        </Route>
        {/* ******** ProtectTeacher Route ******* */}

        {/* ******** ProtectAdmin Route ******* */}
        <Route path="/" element={<AdminRoutes isAdmin={authReducer.isAdmin} />}>
          <Route
            path="/admin-activity-dashboard"
            element={<AdminActivityDashboard />}
          />
          <Route
            path="/admin-request-dashboard"
            element={<AdminRequestDashboard />}
          />
        </Route>

        {/* ******** Public Route ******* */}
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
        {/* ******** Public Route ******* */}
      </Routes>
    </div>
  );
}
