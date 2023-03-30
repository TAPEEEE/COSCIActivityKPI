import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { getCurrentDate } from '../../utils/getCurrentDate';
const CardData = [
  {
    title: 'คำร้องนิสิต',
    count: 108,
    icon: <DescriptionIcon />,
    color: 'bg-green-500',
  },
  {
    title: 'คำร้องบุคลากร',
    count: 16,
    icon: <DescriptionIcon />,
    color: 'bg-red-500',
  },
  {
    title: 'กิจกรรมทั้งหมด',
    count: 14,
    icon: <CalendarMonthIcon />,
    color: 'bg-amber-500',
  },
];

const TeacherStatCard: FC = () => {
  return (
    <>
      <div className="flex flex-wrap">
        {CardData.map((item) => (
          <div
            className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-3 font-Kanit"
            key={item.title}
          >
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-3 xl:mb-0 shadow-lg hover:bg-slate-50">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-1">
                    <h5 className="text-blueGray-400 font-medium text-xl">
                      {item.title}
                    </h5>
                    <span className="font-semibold text-blueGray-700 text-3xl">
                      {item.count}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div
                      className={`text-white p-3 text-center inline-flex items-center justify-center w-14 h-14 rounded-full ${item.color}`}
                    >
                      {item.icon}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blueGray-400 mt-4">
                  <span className="whitespace-nowrap">
                    อัพเดทล่าสุด {getCurrentDate()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(TeacherStatCard);
