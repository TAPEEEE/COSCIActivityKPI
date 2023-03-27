import React, { useState } from 'react';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import StudentRequestTable from '../../components/admin/StudentRequestTable';
import AdminNavbar from '../../components/admin/AdminNavbar';
import TeacherRequestTable from '../../components/admin/TeacherRequestTable';

type AdminRequestDashboardProps = {
  //
};

const AdminRequestDashboard: React.FC<any> = () => {
  const navigate = useNavigate();
  const [selectMenu, setSelectMenu] = useState<boolean>(false);
  function handleClick() {
    navigate('/admin-add-activity');
  }

  return (
    <>
      <AdminNavbar />
      <div className="h-full bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 font-Kanit">
            <div className="lg:flex lg:justify-between">
              <h1 className="text-[28px] font-medium tracking-tight text-gray-900">
                จัดการคำร้อง
              </h1>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <button
                  onClick={() => setSelectMenu(false)}
                  type="button"
                  className="mr-2 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
                >
                  จัดการคำร้องนิสิต
                </button>
                <button
                  onClick={() => setSelectMenu(true)}
                  type="button"
                  className={`text-white inline-flex items-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2}`}
                >
                  จัดการคำร้องบุคลากร
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-3">
          {!selectMenu && (
            <>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white my-8 shadow-md rounded-lg">
                <div className="flex justify-between">
                  <h1 className="font-Kanit font-medium text-2xl mx-5 mt-5 mb-2">
                    คำร้องนิสิตทั้งหมด
                  </h1>
                </div>

                <div className="mx-5 ">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                        <div className="overflow-hidden rounded-lg">
                          <StudentRequestTable />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mx-3">
          {selectMenu && (
            <>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white my-8 shadow-md rounded-lg">
                <div className="flex justify-between">
                  <h1 className="font-Kanit font-medium text-2xl mx-5 mt-5 mb-2">
                    คำร้องบุคลากรทั้งหมด
                  </h1>
                </div>

                <div className="mx-5 ">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                        <div className="overflow-hidden rounded-lg">
                          <TeacherRequestTable />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-28">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminRequestDashboard;
