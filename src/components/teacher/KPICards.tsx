import React, { FC, memo } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

interface CardProps {
  name_event: string;
  event_type: string;
  event_detail: string;
}

const KPICards: FC<CardProps> = (props) => {
  const { name_event, event_type, event_detail } = props;

  return (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 md:max-w-4xl mx-auto border border-white bg-white mb-14 font-Kanit">
      <div className="w-full md:w-3/6 bg-white grid place-items-center">
        <img
          src="https://via.placeholder.com/1080x1080/eee?text=1:1"
          alt="tailwind logo"
          className="rounded-xl"
        />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col  p-3">
        <div className="flex justify-between item-center mb-2">
          <div className="hidden md:block">
            <div className="flex items-center">
              <span className="text-md text-gray-500 mt-1">
                24 Jan - 25 Jan
              </span>
            </div>
          </div>

          <span className="inline-block bg-amber-400 rounded-full px-3 py-1 text-md font-medium text-amber-800 mr-2 mb-2">
            {event_type}
          </span>
        </div>

        <h3 className="text-gray-800 text-xl font-semibold mb-3 line-clamp-2">
          {name_event}
        </h3>

        <div className="flex flex-col justify-between">
          <p className=" text-gray-500 text-sm mb-12 line-clamp-2">
            {event_detail}
          </p>
          <button
            type="submit"
            className="w-full md:w-60 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-xl text-base px-5 py-2.5 text-center"
          >
            ลงทะเบียนเข้าร่วมกิจกรรม
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(KPICards);
