import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAdmin: boolean;
};

const AdminRoutes = ({ isAdmin }: Props) => {
  return isAdmin ? <Outlet /> : <Navigate to="/teacherhome" />;
};

export default AdminRoutes;
