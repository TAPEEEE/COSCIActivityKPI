import React, { useEffect, useState } from 'react';
import './LoginPages.scss';
import logo from '../../assets/COSCI_logo.png';
import { StudentLoginInterface } from '../../components/auth/StudentLoginInterface';
import TeacherLoginInterface from '../../components/auth/TeacherLoginInterface';
import { Tabs } from 'antd';
import '../../scss/AntTabList.scss';
import { Button, Modal, Space } from 'antd';
import { authSelector } from '../../store/slices/authSlice';
import { useSelector } from 'react-redux';
import OtpInterface from '../../components/auth/OtpInterface';
import alertAdd from '../../utils/alertAdd';

const onChange = (key: string) => {
  console.log(key);
};

const role = ['นิสิต', 'อาจารย์และบุคลากร'];

const LoginPages: React.FC<any> = () => {
  const authReducer = useSelector(authSelector);

  useEffect(() => {
    if (authReducer.isSessionExp) {
      alertAdd(
        false,
        'กรุณาเข้าสู่ระบบใหม่',
        'Session หมดอายุเนื่องจากไม่ได้ใช้งานเกินเวลาที่กำหนด',
      );
    }
  });

  return (
    <>
      <div className="w-screen h-screen bgimg overflow-auto">
        <img
          src={logo}
          className="w-44 mt-2.5 ml-5 sm:w-48 sm:mt-5 sm:ml-5 md:w-48 md:ml-20 lg:w-48 lg:ml-40 xl:w-60"
          alt="COSCI_logo"
        />

        <div className="my-auto mt-24 mb-24">
          <div className="flex justify-center cardResponsive">
            {!authReducer.isNotVetify && (
              <Tabs
                onChange={onChange}
                type="card"
                items={role.map((_, i) => {
                  const id = String(i + 1);
                  function componentRender(j: number) {
                    if (j === 0) {
                      return <StudentLoginInterface />;
                    }
                    return <TeacherLoginInterface />;
                  }
                  return {
                    label: `${role[i]}`,
                    key: id,
                    children: componentRender(i),
                  };
                })}
              />
            )}

            {authReducer.isNotVetify && <OtpInterface />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPages;
