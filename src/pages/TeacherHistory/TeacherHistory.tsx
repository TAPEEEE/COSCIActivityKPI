import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
import KPICards from '../../components/teacher/KPICards';
import './TeacherHistory.css';
import '../../scss/KPIHome.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import KPIHistory from '../../components/teacher/KPIHistory';
import TeacherStatCard from '../../components/teacher/TeacherStatCard';

const TeacherHistory: React.FC<any> = () => {
  // const kpiReducer = useSelector();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getKpi());
  // }, [dispatch]);

  return (
    <>
      <div className="w-screen h-screen bgimg overflow-auto">
        <TeacherNavbar />
        <div className="my-auto mt-4">
          <div className="flex justify-center">
            <div className="mx-4 cardHome bg-gray-100 my-8 shadow-md rounded-lg">
              <div className="bg-[#1f2937] rounded-t-lg">
                <div className="flex justify-start">
                  <button
                    className="text-lg text-gray-300 font-medium ml-1 my-3 pl-2 hover:text-gray-500"
                    onClick={() => history.back()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <h1 className="font-Kanit text-lg text-white font-medium my-4">
                    รายละเอียดกิจกรรม
                  </h1>
                </div>
              </div>

              <div className="mx-5 my-5">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                      <div className="overflow-hidden rounded-lg">
                        <KPIHistory />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TeacherHistory;
