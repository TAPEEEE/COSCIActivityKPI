import React from 'react';
import './LoginPages.scss';
import logo from '../../assets/COSCI_logo.png';
import { StudentLoginInterface } from '../../components/auth/StudentLoginInterface';
import { TeacherLoginInterface } from '../../components/auth/TeacherLoginInterface';
import { Tabs } from 'antd';
import '../../scss/AntTabList.scss';

const onChange = (key: string) => {
  console.log(key);
};

const role: String[][] = [
  ['นิสิต', 'LoginInterFace'],
  ['อาจารย์และบุคลากร', 'LoginInterFace'],
];

const LoginPages: React.FC<any> = () => {
  return (
    <>
      <body className="w-screen h-screen bgimg overflow-auto">
        <img
          src={logo}
          className="w-44 mt-2.5 ml-5 sm:w-48 sm:mt-5 sm:ml-5 md:w-48 md:ml-20 lg:w-48 lg:ml-40 xl:w-60"
          alt="COSCI_logo"
        />

        <div className="my-auto mt-24 mb-24">
          <div className="flex justify-center cardResponsive">
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
                  label: `${role[i][0]}`,
                  key: id,
                  children: componentRender(i),
                };
              })}
            />
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPages;
