import React, { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSlice';
import { useAppDispatch } from '../store/store';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Spin } from 'antd';
import {
  ChangePasswordPatch,
  ChangePasswordSelector,
} from '../store/slices/changePasswordSlice';

const ProfileComponent: FC = () => {
  const authReducer = useSelector(authSelector);
  const ChangePasswordReducer = useSelector(ChangePasswordSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Timer = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

  const formik = useFormik({
    initialValues: {
      oldpassword: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string().required('กรุณากรอกรหัสผ่านเก่า'),
      password: Yup.string().required('กรุณากรอกรหัสผ่านใหม่'),
      confirmpassword: Yup.string().when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'รหัสผ่านผ่านไม่ตรงกัน',
        ),
      }),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await Timer(800);
      dispatch(ChangePasswordPatch(values));
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-8 font-Kanit lg:px-16 mt-5">
        <h3 className="mb-5 text-lg font-medium text-[#00567e]">
          ส่วนที่ 1: ข้อมูลส่วนตัว
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
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
        <form onSubmit={formik.handleSubmit}>
          <label className="mb-1 text-md" htmlFor="activitytitle">
            รหัสผ่านเก่า
          </label>
          <div className="form-group mb-5">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldpassword}
              name="oldpassword"
              type="password"
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
            />
            {formik.touched.oldpassword && formik.errors.oldpassword ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.oldpassword}
              </div>
            ) : null}
            {ChangePasswordReducer.isError && (
              <div
                className="bg-red-100 text-red-700 px-4 py-3 rounded relative mt-2"
                role="alert"
              >
                <span className="block sm:inline">รหัสผ่านไม่ถูกต้อง</span>
              </div>
            )}
          </div>
          <label className="mb-1 text-md" htmlFor="activitytitle">
            รหัสผ่านใหม่
          </label>
          <div className="form-group mb-5">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.confirmpassword}
              </div>
            ) : null}
          </div>
          <label className="mb-1 text-md" htmlFor="activitytitle">
            ยืนยันรหัสผ่าน
          </label>
          <div className="form-group mb-5">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmpassword}
              name="confirmpassword"
              type="password"
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
            />
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.confirmpassword}
              </div>
            ) : null}
          </div>
          {ChangePasswordReducer.isSuccess && (
            <div
              className="bg-green-100 text-green-700 px-4 py-3 rounded relative mt-2"
              role="alert"
            >
              <span className="block sm:inline">เปลี่ยนรหัสผ่านสำเร็จ!</span>
            </div>
          )}
          <div className="flex justify-end mt-12">
            <Spin spinning={ChangePasswordReducer.isLoading}>
              <>
                <button
                  type="submit"
                  className="font-Kanit mt-1 w-full md:w-60 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-xl text-base px-5 py-2.5 text-center"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </>
            </Spin>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(ProfileComponent);
