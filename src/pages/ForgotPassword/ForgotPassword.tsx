import React, { FC, useEffect, useState } from 'react';
import './ForgotPassword.css';
import logo from '../../assets/COSCI_logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TeacherRegisterInterface from '../../components/auth/TeacherRegisterInterface';
import { useSelector } from 'react-redux';
import { store, useAppDispatch } from '../../store/store';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {
  forgotPasswordSent,
  TeacherPasswordSelector,
} from '../../store/slices/teacherPasswordSlice';
import alertWithButton from '../../utils/alertWitbutton';
import alertAdd from '../../utils/alertAdd';

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const forGotPasswordReducer = useSelector(TeacherPasswordSelector);
  const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  const Timer = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

  const formik = useFormik({
    initialValues: {
      user_id: '',
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required('กรุณากรอกชื่อผู้ใช้'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await Timer(800);
      await dispatch(forgotPasswordSent(values));
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="w-screen h-screen bgimg overflow-auto">
        <img
          src={logo}
          className="w-44 mt-2.5 ml-5 sm:w-48 sm:mt-5 sm:ml-5 md:w-48 md:ml-20 lg:w-48 lg:ml-40 xl:w-60"
          alt="COSCI_logo"
        />
        <div className="my-auto mt-16 mb-28 mx-3">
          <div className="flex justify-center cardResponsive">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 font-Kanit w-96 lg:w-96 md:max-w-sm sm:max-w-sm">
              <div className="space-y-5">
                <h3 className="text-xl font-medium text-gray-900 ">
                  ลืมรหัสผ่าน?
                </h3>
                <form onSubmit={formik.handleSubmit}>
                  <>
                    <label className="text-sm font-medium text-gray-900 block mb-2 mt-5">
                      ชื่อผู้ใช้
                    </label>

                    <input
                      id="user_id"
                      type="text"
                      name="user_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.user_id}
                    />
                    {formik.touched.user_id && formik.errors.user_id ? (
                      <div className="text-red-600 text-sm mt-1">
                        {formik.errors.user_id}
                      </div>
                    ) : null}
                    {forGotPasswordReducer.isNotFound && (
                      <div
                        className="bg-red-100 text-red-700 px-4 py-3 rounded relative mt-2"
                        role="alert"
                      >
                        <span className="block sm:inline">
                          กรอกชื่อผู้ใช้ไม่ถูกต้อง
                        </span>
                      </div>
                    )}

                    {forGotPasswordReducer.isSuccess && (
                      <div
                        className="bg-green-100 text-green-700 px-4 py-3 rounded relative mt-2"
                        role="alert"
                      >
                        <span className="block sm:inline">
                          {`รหัสผ่านใหม่ถูกส่งไปที่ ${forGotPasswordReducer.ForgotPasswordResult?.email}`}
                        </span>
                      </div>
                    )}
                  </>

                  <>
                    <Spin
                      indicator={loadingIcon}
                      spinning={forGotPasswordReducer.isLoading}
                    >
                      <button
                        type="submit"
                        className="font-Kanit mt-5 w-full text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        เปลี่ยนรหัสผ่าน
                      </button>
                    </Spin>
                  </>
                </form>

                <>
                  <div className="flex items-start">
                    <a
                      href="/"
                      className="text-sm text-[#00567e] hover:underline ml-auto"
                    >
                      กลับหน้าเข้าสู่ระบบ
                    </a>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
