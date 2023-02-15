import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAuthented: boolean;
};

const PublicRoutes = ({ isAuthented }: Props) => {
  return isAuthented ? <Navigate to="/admin-activity-dashboard" /> : <Outlet />;
};

export default PublicRoutes;
