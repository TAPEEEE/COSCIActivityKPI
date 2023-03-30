import React, { useEffect, useState, memo, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import ActivityTable from '../../components/admin/ActivityTable';
import ActivityStatCard from '../../components/admin/ActivityStatCard';
import KPITable from '../../components/admin/KPITable';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Modal, DatePicker } from 'antd';

type AdminActivityDashboardProps = {
  //
};

const AdminActivityDashboard: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { RangePicker } = DatePicker;

  return (
    <>
      <AdminNavbar />
      <div className="h-full bg-gray-100 font-Kanit">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 font-Kanit">
            <div className="lg:flex lg:justify-between">
              <h1 className="text-[28px] font-medium tracking-tight text-gray-900">
                จัดการกิจกรรม
              </h1>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl my-5">
          <ActivityStatCard />
        </div>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white my-8 shadow-md rounded-lg">
          <div className="flex justify-between">
            <h1 className="font-Kanit font-medium text-2xl mx-5 my-5">
              กิจกรรมบุคลากร
            </h1>
            <button
              onClick={() => navigate('/admin-add-activity')}
              type="button"
              className="font-Kanit mt-4 mb-4 mr-4 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
            >
              เพิ่มกิจกรรม
            </button>
          </div>

          <div className="mx-5 my-5">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                  <div className="overflow-hidden rounded-lg">
                    <KPITable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-3">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white my-8 shadow-md rounded-lg">
            <div className="flex justify-between">
              <h1 className="font-Kanit font-medium text-2xl mx-5 my-5">
                กิจกรรมนิสิต
              </h1>
              <button
                onClick={() => navigate('/admin-add-activity')}
                type="button"
                className="font-Kanit mt-4 mb-4 mr-4 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
              >
                เพิ่มกิจกรรม
              </button>
            </div>

            <div className="mx-5 my-5">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden rounded-lg">
                      <ActivityTable />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-28">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default memo(AdminActivityDashboard);
