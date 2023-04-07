import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
import KPICards from '../../components/teacher/KPICards';
import './TeacherHome.css';
import '../../scss/KPIHome.scss';
import { getKpi, kpiSelector } from '../../store/slices/kpiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { Empty, Spin } from 'antd';

const TeacherHome: React.FC<any> = () => {
  const kpiReducer = useSelector(kpiSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getKpi());
    console.log(kpiReducer.kpiAllResult);
  }, [dispatch]);

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
                    กิจกรรมบุคลากรทั้งหมด
                  </h1>
                </div>
              </div>

              {kpiReducer.kpiAllResult ? (
                <div className="mx-5 py-5 sm:px-6 lg:px-8 mt-8">
                  <Spin
                    spinning={kpiReducer.isLoading}
                    size="large"
                    className="mt-24"
                  >
                    {kpiReducer.kpiAllResult.map((item) => (
                      <KPICards
                        key={item._id}
                        id={item._id}
                        name_event={item.name_event}
                        event_type={item.event_type}
                        detail_event={item.detail_event}
                        start_date={item.start_date}
                        end_date={item.end_date}
                        event_img={item.event_img}
                      />
                    ))}
                  </Spin>
                </div>
              ) : (
                <Spin
                  spinning={kpiReducer.isLoading}
                  size="large"
                  className="my-24"
                >
                  <Empty
                    className="my-54 mx-max"
                    description={'ยังไม่มีกิจกรรมที่สามารถเข้าร่วมได้'}
                  />
                </Spin>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TeacherHome;
