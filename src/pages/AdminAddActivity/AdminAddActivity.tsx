import React from 'react';
import AddActivity from '../../components/admin/AddActivity';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Footer from '../../components/Footer';

type AdminAddActivityProps = {
  //
};

const AdminAddActivity: React.FC<any> = () => {
  return (
    <>
      <AdminNavbar />
      <div className="h-full bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 font-Kanit">
            <div className="lg:flex lg:justify-between">
              <h1 className="text-[28px] font-medium tracking-tight text-gray-900">
                จัดการกิจกรรม
              </h1>
            </div>
          </div>
        </header>

        <div className="mx-3">
          <>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white my-8 shadow-md rounded-lg">
              <div className="flex justify-between">
                <h1 className="font-Kanit font-medium text-2xl mx-5 mt-5 mb-2">
                  เพิ่มกิจกรรม
                </h1>
              </div>

              <div className="mx-5 ">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                      <div className="overflow-hidden rounded-lg">
                        <AddActivity />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>

        <div className="mt-28">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminAddActivity;
