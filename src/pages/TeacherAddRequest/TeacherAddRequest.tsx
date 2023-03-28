import React, { FC, useEffect } from 'react';
import './TeacherAddRequest.css';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
import { useMatch, useNavigate } from 'react-router-dom';
import { getKPIById, kpiSelector } from '../../store/slices/kpiSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import moment from 'moment';
import { Image } from 'antd';
import { authSelector } from '../../store/slices/authSlice';
import AddRequest from '../../components/teacher/AddRequest';

type TeacherAddRequestlProps = {
  //
};

const TeacherAddRequest: FC = () => {
  const match = useMatch('/teacher/add-request/:id');
  const dispatch = useAppDispatch();
  const kpiReducer = useSelector(kpiSelector);
  const authReducer = useSelector(authSelector);
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
                    ลงบันทึกกิจกรรม
                  </h1>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden rounded-lg">
                      <div className="block rounded-lg shadow-lg max-w-100 p-6 font-Kanit lg:px-16">
                        <AddRequest
                          id_event={kpiReducer.kpiOneResult?._id}
                          user_name={authReducer.loginResult?.data.name}
                          user_role={authReducer.loginResult?.data.role}
                          user_email={authReducer.loginResult?.data.email}
                          name_event={kpiReducer.kpiOneResult?.name_event}
                          detail_event={kpiReducer.kpiOneResult?.detail_event}
                          event_type={kpiReducer.kpiOneResult?.event_type}
                          event_img={kpiReducer.kpiOneResult?.event_img}
                          start_date={kpiReducer.kpiOneResult?.start_date}
                          end_date={kpiReducer.kpiOneResult?.end_date}
                          uploaded_img={kpiReducer.kpiOneResult?.event_img_list}
                        />
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

export default TeacherAddRequest;
