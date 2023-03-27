import React, { FC } from 'react';
import './TeacherKPIDetail.css';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
type TeacherKPIDetailProps = {
  //
};

const TeacherKPIDetail: FC = () => {
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

              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden rounded-lg">
                      <div className="block rounded-lg shadow-lg max-w-100 p-6 font-Kanit lg:px-16">
                        <h1 className="font-Kanit text-[#1f2937] font-medium text-xl my-4 sm:text-md mb-8">
                          เตรียมพบกับการถ่ายทอดสด
                          การริมสุขภาวะนวัตกรรมที่ดีในหัวข้อ Ready Warm up
                          Workout!
                        </h1>
                        <div className="flex justify-center">
                          <img
                            src="https://via.placeholder.com/1080x1080/eee?text=1:1"
                            alt="tailwind logo"
                            className="rounded-xl w-full lg:w-2/4 md:w-2/4 xl:w-2/4 2xl:w-2/4"
                          />
                        </div>

                        <div className="hidden md:block">
                          <div className="flex items-center">
                            <span className="text-md text-gray-500 mt-1">
                              {/* {`${moment(start_date).format('ll')} - ${moment(
                                  end_date,
                                ).format('ll')}`} */}
                              24 Jan 2020 - 21 Jan 2020
                            </span>
                          </div>
                        </div>
                        <span
                          className={`inline-block bg-amber-300 rounded-full px-3 py-1 text-md font-medium text-amber-800 mr-2 mb-2`}
                        >
                          กิจกรรมเลือก
                        </span>

                        <div className="flex justify-center">
                          <div className="flex justify-between mt-52 space-x-3">
                            <button>test</button>
                          </div>
                        </div>
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

export default TeacherKPIDetail;