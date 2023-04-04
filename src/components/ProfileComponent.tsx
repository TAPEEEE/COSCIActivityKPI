import React, { FC, memo, useEffect, useState } from 'react';
import { DatePicker, Empty, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { UploadProps, Image } from 'antd';
import moment from 'moment';
import { imageUrl, server } from '../constants';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSlice';
import { useAppDispatch } from '../store/store';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { kpiRequestAdd } from '../store/slices/kpiRequestSlice';
import alertAdd from '../utils/alertAdd';
import { useNavigate } from 'react-router-dom';

interface Profile {
  _id: string;
  user_id: string;
  name: string;
  role: string;
  email: string;
  tel: string;
  img_user: string;
}

const ProfileComponent: FC<Profile> = (props) => {
  const { _id, user_id, name, role, email, tel, img_user } = props;
  const authReducer = useSelector(authSelector);
  const navigate = useNavigate();
  const Timer = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

  // const onModalOK = async () => {

  // const handleSubmit = async (value) => {
  //   await dispatch(kpiRequestAdd(value));
  //   alertAdd(true, 'ลงทะเบียนกิจกรรมสำเร็จ', '');
  //   await Timer(2000);
  //   navigate('/teacherhistory');
  // };

  return (
    <>
      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-8 font-Kanit lg:px-16 mt-5">
        <h3 className="mb-5 text-lg font-medium text-[#00567e]">
          ส่วนที่ 1: ข้อมูลส่วนตัว
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-4">
            <h3 className="mb-1 text-md">ชื่อ-สกุล</h3>
            <input
              value={authReducer.loginResult?.data.name}
              disabled
              type="text"
              className="bg-gray-200 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group mb-5">
            <h3 className="mb-1 text-md">ตำแหน่ง</h3>
            <input
              value={authReducer.loginResult?.data.role}
              disabled
              type="text"
              className="bg-gray-200 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
            />
          </div>
        </div>
        <label className="mb-1 text-md" htmlFor="activitytitle">
          Email
        </label>
        <div className="form-group mb-5">
          <input
            value={authReducer.loginResult?.data.email}
            disabled
            name="activityTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
          />
        </div>
        <label className="mb-1 text-md" htmlFor="activitytitle">
          เบอร์โทรศัพท์
        </label>
        <div className="form-group mb-5">
          <input
            value={authReducer.loginResult?.data.tel}
            disabled
            name="activityTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
          />
        </div>
      </div>
      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-6 font-Kanit lg:px-16 mt-8">
        <h3 className="mb-5 text-lg font-medium text-[#00567e]">
          ส่วนที่ 2: เปลี่ยนรหัสผ่าน
        </h3>

        <label className="mb-1 text-md" htmlFor="activitytitle">
          รหัสผ่านเก่า
        </label>
        <div className="form-group mb-12">
          <input
            value={email}
            disabled
            name="activityTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
          />
        </div>
        <label className="mb-1 text-md" htmlFor="activitytitle">
          รหัสผ่านใหม่
        </label>
        <div className="form-group mb-5">
          <input
            value={email}
            disabled
            name="activityTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
          />
        </div>
        <label className="mb-1 text-md" htmlFor="activitytitle">
          ยืนยันรหัสผ่าน
        </label>
        <div className="form-group mb-5">
          <input
            value={email}
            disabled
            name="activityTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
          />
        </div>
        <div className="flex justify-end mt-12">
          <button
            type="submit"
            // onClick={() =>
            //   handleSubmit({
            //     id_event: id_event,
            //     start_date: start_date,
            //     end_date: end_date,
            //     status_request: 'สำเร็จ',
            //     type_request: event_type,
            //     uploaded_pdf: 'null',
            //   })
            // }
            className="w-full md:w-60 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-xl text-base px-5 py-2.5 text-center"
          >
            ส่งคำร้องลงบันทึกกิจกรรม
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileComponent);
