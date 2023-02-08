import React from 'react';
// import AddActivity from '../../components/admin/AddActivity';
import AdminNavbar from '../../components/admin/AdminNavbar';

type AdminAddActivityProps = {
  //
};

const AdminAddActivity: React.FC<any> = () => {
  return (
    <>
      <AdminNavbar />
      <body className="h-full bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 font-Kanit">
            <div className="lg:flex lg:justify-between">
              <h1 className="text-[24px] font-medium tracking-tight text-gray-900">
                เพิ่มกิจกรรม
              </h1>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-2 sm:px-0">{/* <AddActivity /> */}</div>
        </div>
      </body>
    </>
  );
};

export default AdminAddActivity;
