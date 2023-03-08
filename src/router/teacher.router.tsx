import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isTeacher: boolean;
};

const AdminRoutes = ({ isTeacher }: Props) => {
  return isTeacher ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
