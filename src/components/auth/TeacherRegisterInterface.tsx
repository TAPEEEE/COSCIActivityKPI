import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
  const [, setReload] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    setReload(dataHook.reLoad);
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      user_id: dataHook.object.user_id,
      name: dataHook.object.name,
      password: '',
      confirmpassword: '',
      role: dataHook.object.role,
      email: dataHook.object.email,
      tel: dataHook.object.tel,
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
      await Timer(1000);
      navigate('/otpverify');
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
          type="text"
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
          type="text"
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

      <button className="w-full mt-5 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        สมัครสมาชิก
      </button>
    </form>
  );
};

export default TeacherRegisterInterface;
