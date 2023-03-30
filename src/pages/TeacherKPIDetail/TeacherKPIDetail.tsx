import React, { FC, useEffect } from 'react';
import './TeacherKPIDetail.css';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
import { useMatch, useNavigate } from 'react-router-dom';
import { getKPIById, kpiSelector } from '../../store/slices/kpiSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import moment from 'moment';
import { Empty, Image } from 'antd';
import { imageUrl } from '../../constants';

type TeacherKPIDetailProps = {
  //
};

const TeacherKPIDetailRequest: FC = () => {
  const match = useMatch('/teacher/event/:id');
  const dispatch = useAppDispatch();
  const kpiReducer = useSelector(kpiSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (match?.params.id) {
      dispatch(getKPIById(match?.params.id));
    } else {
      console.log(false);
      navigate('/teacherhome');
    }
  }, [dispatch, match?.params.id]);

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
                  <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden rounded-lg">
                      <div className="block rounded-lg shadow-lg max-w-100 p-6 font-Kanit lg:px-16">
                        <div className="flex justify-end">
                          <div className="hidden md:block mb-5">
                            <span className="text-lg text-gray-400">
                              {`โพสต์เมื่อ ${moment(
                                kpiReducer.kpiOneResult?.posted_timestamp,
                              ).format('DD MMMM YYYY เวลา hh:mm')}`}
                            </span>
                          </div>
                        </div>
                        <h1 className="font-Kanit text-[#00567e] font-medium text-xl sm:text-md mb-5 mt-2">
                          {kpiReducer.kpiOneResult?.name_event}
                        </h1>
                        <div className="flex justify-center my-8">
                          <img
                            src={kpiReducer.kpiOneResult?.event_img}
                            alt={kpiReducer.kpiOneResult?.event_img}
                            className="rounded-xl w-full lg:w-2/4 md:w-2/4 xl:w-2/4 2xl:w-2/4"
                          />
                        </div>

                        <h1 className="font-Kanit text-gray-500 font-regular text-lg sm:text-md mb-8">
                          {kpiReducer.kpiOneResult?.detail_event}
                        </h1>

                        <h1 className="font-Kanit text-[#282e38] font-regular text-lg sm:text-md mb-2">
                          ประเภทกิจกรรม :
                          <span
                            className={`inline-block bg-amber-300 rounded-full px-3  sm:text-md font-regular text-lg text-amber-800 ml-2 `}
                          >
                            กิจกรรมเลือก
                          </span>
                        </h1>
                        <h1 className="font-Kanit text-[#282e38] font-regular text-lg sm:text-md mb-2">
                          {`จำนวนชั่วโมงที่ได้รับ :`}
                          <span className="text-md text-gray-500 mt-1 ml-2">
                            {`${kpiReducer.kpiOneResult?.activity_hour} ชั่วโมง`}
                          </span>
                        </h1>
                        <h1 className="font-Kanit text-[#282e38] font-regular text-lg sm:text-md mb-2">
                          วันเริ่มต้นกิจกรรม :
                          <span className="text-md text-gray-500 mt-1 ml-2">
                            {`${moment(kpiReducer.kpiOneResult?.start_date)
                              .add(543, 'year')
                              .format('DD MMMM YYYY เวลา hh:mm')}`}
                          </span>
                        </h1>
                        <h1 className="font-Kanit text-[#282e38] font-regular text-lg sm:text-md mb-2">
                          สิ้นสุดกิจกรรม :
                          <span className="text-md text-gray-500 mt-1 ml-2">
                            {`${moment(kpiReducer.kpiOneResult?.end_date)
                              .add(543, 'year')
                              .format('DD MMMM YYYY เวลา hh:mm')}`}
                          </span>
                        </h1>
                        <h1 className="font-Kanit text-[#282e38] font-regular text-lg sm:text-md mb-5">
                          {`รูปภาพกิจกรรม : ${kpiReducer.kpiOneResult?.event_img_list?.length} รูป`}
                        </h1>

                        {/* <div className="flex justify-start"> */}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-5">
                          <Image.PreviewGroup>
                            {kpiReducer.kpiOneResult?.event_img_list?.map(
                              (index) => (
                                <Image
                                  key={index}
                                  className="object-cover w-auto h-52 rounded-lg"
                                  src={`${imageUrl}${index}`}
                                />
                              ),
                            )}
                          </Image.PreviewGroup>
                        </div>

                        <div className="flex justify-center">
                          <div className="flex justify-between mt-28 space-x-3">
                            <button
                              onClick={() =>
                                navigate(
                                  `/teacher/add-request/${kpiReducer.kpiOneResult?._id}`,
                                )
                              }
                              type="button"
                              className="w-full md:w-60 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-xl text-base px-5 py-2.5 text-center"
                            >
                              ลงทะเบียนเข้าร่วมกิจกรรม
                            </button>
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

export default TeacherKPIDetailRequest;
