import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/slices/authSlice";

type PageNotFoundProps = {
  //
};

const PageNotFound: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100 font-Kanit mt-20">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <Result status="404" />
          <p className="text-2xl font-semibold md:text-3xl">
            เกิดข้อผิดพลาดไม่พบหน้าที่ค้นหา
          </p>
          <Link
            onClick={() => dispatch(logout())}
            to="/"
            className="mt-5 inline-flex items-center rounded-md border border-transparent bg-[#005076] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0873a5] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
