import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isTeacher: boolean;
};

const TeacherRoutes = ({ isTeacher }: Props) => {
  return isTeacher ? <Outlet /> : <Navigate to="/teacherhome" />;
};

export default TeacherRoutes;
