import alertTermAndConditions from '../../utils/alertTermAndConditions';
import React, { FC, memo, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../App.css';
import '../../scss/LoginInterface.scss';
import { useSelector } from 'react-redux';
import { store, useAppDispatch } from '../../store/store';
import {
  authSelector,
  login,
  logout,
  otpClear,
} from '../../store/slices/authSlice';
import { Alert } from '@mui/material';
import { Button, Modal, Space } from 'antd';

// const dispatch = useAppDispatch();
// const authReducer = useSelector(authSelector);

const UserLoginSchema = Yup.object().shape({
  user_id: Yup.string().required('กรุณากรอกชื่อผู้ใช้'),
  password: Yup.string().required('กรุณากรอกรหัสผ่าน'),
});

const OtpInterface: FC = () => {
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setSeconds(4);
  };

  const back = async () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div>
      <Formik
        initialValues={{
          user_id: authReducer.loginResult?.data.email,
          password: '',
        }}
        validationSchema={UserLoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // dispatch(login(values));
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <div className="bg-white rounded-b-lg rounded-tr-lg rounded-tr-lgshadow-md border border-gray-200 max-w-sm p-4 sm:p-6 lg:p-8 font-Kanit cardL">
            <div>
              <span className="text-2xl font-medium text-gray-900">
                กรุณายืนยันรหัส OTP
              </span>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900 block mb-2 mt-5">
                รหัสถูกส่งไปยัง Email
              </label>
              <Form className="space-y-3">
                <Field
                  className="bg-gray-300 border text-gray-900 sm:text-base rounded-lg w-full p-2.5 text-center"
                  name="user_id"
                  type="text"
                  disabled
                />
                {errors.user_id && touched.user_id ? (
                  <div className="text-red-600 text-sm">{errors.user_id}</div>
                ) : null}
                <label className="text-base font-medium text-gray-900 block mb-2 mt-5">
                  OTP
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg block w-full p-2.5"
                  name="รหัส OTP"
                  placeholder="••••••••"
                  type="text"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                ) : null}
                {authReducer.isError && (
                  <div
                    className="bg-red-100 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      กดส่งอีกครั้งใน: {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p>ยังไม่ได้รับรหัส?</p>
                  )}

                  <button
                    type="button"
                    disabled={seconds > 0 || minutes > 0}
                    style={{
                      color: seconds > 0 || minutes > 0 ? '#DFE3E8' : '#FF5630',
                    }}
                    onClick={resendOTP}
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                >
                  ยืนยันรหัส OTP
                </button>

                <button
                  onClick={back}
                  type="button"
                  className="mt-2 w-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                >
                  ย้อนกลับ
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default memo(OtpInterface);
