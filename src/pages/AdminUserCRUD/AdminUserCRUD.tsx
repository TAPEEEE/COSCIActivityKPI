import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminUserTable from '../../components/admin/AdminUserTable';
import Footer from '../../components/Footer';

type AdminUserCRUDProps = {
  //
};

const AdminUserCRUD: React.FC<any> = () => {
  return (
    <>
      <AdminNavbar />
      <body className="h-full bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 font-Kanit">
            <div className="lg:flex lg:justify-between">
              <h1 className="text-[28px] font-medium tracking-tight text-gray-900">
                จัดการคำร้อง
              </h1>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <button
                  type="button"
                  className="mr-2 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
                >
                  เพิ่มข้อมูลนิสิตและบุคลากร [CSV]
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white my-8 shadow-md rounded-lg">
          <div className="flex justify-between">
            <h1 className="font-Kanit font-medium text-2xl mx-5 mt-5 mb-2">
              ผู้ใช้งานทั้งหมด
            </h1>
          </div>

          <div className="mx-5 ">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                  <div className="overflow-hidden rounded-lg">
                    <AdminUserTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-28">
          <Footer />
        </div>
      </body>
    </>
  );
};

export default AdminUserCRUD;
