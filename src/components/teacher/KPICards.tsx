import React, { FC, memo } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import 'moment/locale/th';
interface CardProps {
  id?: string;
  name_event?: string;
  detail_event?: string;
  start_date?: string;
  end_date?: string;
  posted_timestamp?: string;
  event_type?: string;
  event_img?: string;
  activity_hour?: number;
  event_status?: boolean;
  permissions_type?: string;
}

const KPICards: FC<CardProps> = (props) => {
  const navigate = useNavigate();
  const {
    name_event,
    event_type,
    detail_event,
    start_date,
    end_date,
    event_img,
    id,
  } = props;

  return (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 md:max-w-4xl mx-auto border border-white bg-white mb-14 font-Kanit">
      <div className="w-full md:w-5/12 bg-white grid place-items-center">
        <img src={event_img} alt={event_img} className="rounded-xl" />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col  p-3">
        <div className="flex justify-between item-center mb-2">
          <div className="hidden md:block">
            <div className="flex items-center">
              <span className="text-md text-gray-500 mt-1">
                {`${moment(start_date).format('ll')} - ${moment(
                  end_date,
                ).format('ll')}`}
              </span>
            </div>
          </div>
          <span
            className={`inline-block bg-amber-300 rounded-full px-3 py-1 text-md font-medium text-amber-800 mr-2 mb-2`}
          >
            {event_type}
          </span>
        </div>

        <h3 className="text-gray-800 text-xl font-semibold mb-3 line-clamp-2">
          {name_event}
        </h3>
        <div className="flex justify-between"></div>
        <div className="flex flex-col justify-end">
          <p className=" text-gray-500 text-sm mb-12 line-clamp-2">
            {detail_event}
          </p>
          <button
            onClick={() => navigate(`/teacher/event/${id}`)}
            type="button"
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
