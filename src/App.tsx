import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import ProtectedRoutes from './router/protected.router';
import PublicRoutes from './router/public.router';
import { useSelector } from 'react-redux';
import { authSelector, relogin } from './store/slices/authSlice';
import { useAppDispatch } from './store/store';
import PageNotFound from './pages/PageNotFound';
import RegisterPages from './pages/RegisterPages';

export default function App() {
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(relogin());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        {/** Protected Routes */}
        {/** Wrap all Route under ProtectedRoutes element */}
        <Route
          path="/"
          element={<ProtectedRoutes isAuthented={authReducer.isAuthented} />}
        >
          <Route path="/test" element={<PageNotFound />} />
        </Route>

        {/** Wrap all Route under PublicRoutes element */}
        <Route
          path="/"
          element={<PublicRoutes isAuthented={authReducer.isAuthented} />}
        >
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  );
}
