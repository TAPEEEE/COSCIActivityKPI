import { FC, memo, useState } from 'react';
import moment from 'moment';

interface ActivityProps {
  name_event: string;
  start_date: string;
  end_date: string;
  event_type: string;
  event_img: string;
  posted_timestamp: string;
  event_status: boolean;
}

const AdminActivityTable: FC<ActivityProps> = (props) => {
  const { name_event, start_date, end_date, event_type, event_img } = props;

  return (
    <tr className="bg-gray-100 border-b" key={name_event}>
      <td className="px-3 py-4 text-sm font-medium text-gray-900">
        <img
          src={`http://localhost:8081/public/uploaded/` + event_img}
          className="p-1 rounded w-max"
          alt="..."
        />
      </td>
      <td className="px-6 py-4  text-md font-medium text-gray-900">
        {name_event}
      </td>

      <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {event_type}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {moment(start_date).format('ll')}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {moment(end_date).format('ll')}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <button
          // onClick={handleClick}
          type="button"
          className="mr-2 font-Kanit mt-4 mb-4 inline-flex items-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
        >
          แก้ไข
        </button>
        <button
          // onClick={handleClick}
          type="button"
          className="font-Kanit mt-4 mb-4 inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
        >
          ลบ
        </button>
      </td>
    </tr>
  );
};

export default memo(AdminActivityTable);
