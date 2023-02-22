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
          src="http://cosci.swu.ac.th/img/thumb/photo-800x460--3.jpg"
          alt="tailwind logo"
          className="rounded-xl"
        />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col  p-3">
        <div className="flex justify-between item-center mb-2">
          <div className="hidden md:block">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                color="gray"
                fill="currentColor"
                className="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />{' '}
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />{' '}
              </svg>
              <span className="ml-2 text-lg text-gray-400">
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
  );
};

export default memo(KPICards);
