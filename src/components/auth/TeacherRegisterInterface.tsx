import React from 'react';
import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { teacherUploadSelector } from '../../store/slices/teacherUploadSlice';
import { useAppDispatch } from '../../store/store';
import { authSelector, logout, register } from '../../store/slices/authSlice';
import alertAdd from '../../utils/alertAdd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface PreFilledProps {
  object: {
    user_id: string;
    name: string;
    role: string;
    email: string;
    tel: string;
    register_check: boolean;
  };
  reLoad: boolean;
}

const TeacherRegisterInterface: FC<PreFilledProps> = (props) => {
  const dataHook = props;
  const Timer = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));
  const [reload, setReload] = useState<boolean>(false);
  const navigate = useNavigate();
  const teacherUploadReducer = useSelector(teacherUploadSelector);
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const back = async () => {
    await dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    setReload(dataHook.reLoad);
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      user_id: teacherUploadReducer.teacherUploadResult?.data.data.user_id,
      name: teacherUploadReducer.teacherUploadResult?.data.data.name,
      password: '',
      confirmpassword: '',
      role: teacherUploadReducer.teacherUploadResult?.data.data.role,
      email: teacherUploadReducer.teacherUploadResult?.data.data.email,
      tel: teacherUploadReducer.teacherUploadResult?.data.data.tel,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('รูปแบบ Email ไม่ถูกต้อง')
        .required('กรุณากรอก Email'),
      password: Yup.string()
        .min(8, 'รหัสผ่านต้องมากกว่า 8 ตัว')
        .required('กรุณากรอกรหัสผ่าน'),
      confirmpassword: Yup.string().when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'รหัสผ่านผ่านไม่ตรงกัน',
        ),
      }),
      tel: Yup.string()
        .matches(phoneRegExp, 'กรอกเบอร์โทรศัพท์ไม่ถูกต้อง')
        .min(10, 'กรอกเบอร์โทรศัพท์ไม่ถูกต้อง')
        .max(10, 'กรอกเบอร์โทรศัพท์ไม่ถูกต้อง'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(register(values));
      if (authReducer.registerResult?.error) {
        alertAdd(false, 'สมัครสมาชิกไม่สำเร็จ', '');
        return;
      } else {
        alertAdd(true, 'สมัครสมาชิกสำเร็จ', '');
      }
      await Timer(2000);
      navigate('/login');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          ชื่อผู้ใช้
        </label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          disabled
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.user_id}
          className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          ชื่อ - สกุล
        </label>
        <input
          type="text"
          id="name"
          name="name"
          disabled
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          ตำแหน่ง
        </label>
        <input
          type="text"
          id="role"
          name="role"
          disabled
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
          className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          disabled
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          เบอร์โทรศัพท์
        </label>
        <input
          placeholder="example@g.sw.ac.th"
          type="text"
          id="tel"
          name="tel"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tel}
        />
        {formik.touched.tel && formik.errors.tel ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.tel}</div>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          รหัสผ่าน
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-900 block mb-1 mt-5">
          ยืนยันรหัสผ่าน
        </label>
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmpassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.confirmpassword}
          </div>
        ) : null}
      </div>
      <Spin indicator={loadingIcon} spinning={authReducer.isLoading}>
        <button
          type="submit"
          className="font-Kanit w-full mt-5 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
        >
          สมัครสมาชิก
        </button>
      </Spin>

      <button
        onClick={back}
        type="button"
        className="w-full mt-3 text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
      >
        ย้อนกลับ
      </button>
    </form>
  );
};

export default TeacherRegisterInterface;
