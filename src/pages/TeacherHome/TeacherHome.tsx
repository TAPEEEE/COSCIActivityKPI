import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
import KPICards from '../../components/teacher/KPICards';
import './TeacherHome.css';
import '../../scss/KPIHome.scss';
import { deleteKpi, getKpi, kpiSelector } from '../../store/slices/kpiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';

const StudentHome: React.FC<any> = () => {
  const kpiReducer = useSelector(kpiSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getKpi());
  }, [dispatch]);

  useEffect(() => {
    console.log(kpiReducer.kpiAllResult);
  });

  return (
    <>
      <div className="w-screen h-screen bgimg overflow-auto">
        <TeacherNavbar />
        <div className="my-auto mt-4">
          <div className="flex justify-center">
            <div className="mx-4 cardHome bg-gray-100 my-8 shadow-md rounded-lg">
              <div className="bg-[#1f2937] rounded-t-lg">
                <div className="flex justify-between">
                  <h1 className="font-Kanit text-white font-medium text-lg ml-2 mx-4 my-4 pl-2 sm:text-md">
                    กิจกรรมนิสิตทั้งหมด
                  </h1>
                </div>
              </div>

              <div className="mx-5 py-5 sm:px-6 lg:px-8 mt-8">
                {kpiReducer.kpiAllResult.map((item) => (
                  <KPICards
                    key={item.name_event}
                    name_event={item.name_event}
                    event_type={item.event_type}
                    detail_event={item.detail_event}
                    start_date={item.start_date}
                    end_date={item.end_date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default StudentHome;