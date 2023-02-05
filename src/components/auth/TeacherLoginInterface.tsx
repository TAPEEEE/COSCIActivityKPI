import alertTermAndConditions from '../../utils/alertTeamAndConditions';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../App.css';
import '../../scss/LoginInterface.scss';

const UserLoginSchema = Yup.object().shape({
  user_id: Yup.string().required('กรุณากรอกชื่อผู้ใช้'),
  password: Yup.string().required('กรุณากรอกรหัสผ่าน'),
});

export const TeacherLoginInterface = () => (
  <div>
    <Formik
      initialValues={{
        user_id: '',
        password: '',
      }}
      validationSchema={UserLoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <div className="bg-white rounded-b-lg rounded-tr-lg rounded-tr-lgshadow-md border border-gray-200 max-w-sm p-4 sm:p-6 lg:p-8 font-Kanit cardL">
          <div>
            <span className="text-2xl font-medium text-gray-900">
              เข้าสู่ระบบ
            </span>

            <span className="ml-2 text-lg font-normal text-red-600">
              (สำหรับบุคลากร)
            </span>
          </div>

          <div>
            <label className="text-base font-medium text-gray-900 block mb-2 mt-5">
              ชื่อผู้ใช้
            </label>
            <Form className="space-y-3">
              <Field
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg block w-full p-2.5"
                placeholder="co6XXXXXXXX"
                name="user_id"
                type="text"
              />
              {errors.user_id && touched.user_id ? (
                <div className="text-red-600 text-sm">{errors.user_id}</div>
              ) : null}
              <label className="text-base font-medium text-gray-900 block mb-2 mt-5">
                รหัสผ่าน
              </label>
              <Field
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg block w-full p-2.5"
                name="password"
                placeholder="••••••••"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className="text-red-600 text-sm">{errors.password}</div>
              ) : null}
              <div className="flex items-start">
                <a
                  href="#"
                  className="text-sm text-[#00567e] hover:underline ml-auto"
                >
                  ลืมรหัสผ่าน?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-lg text-base px-5 py-2.5 text-center"
              >
                เข้าสู่ระบบ
              </button>

              <button
                onClick={alertTermAndConditions}
                type="button"
                className="mt-2 w-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
              >
                สมัครสมาชิก
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  </div>
);
