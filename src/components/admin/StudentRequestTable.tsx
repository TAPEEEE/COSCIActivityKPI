import React, { FC, useState } from 'react';
import { Modal, TableProps } from 'antd';
import { Button, Space, Table, Image } from 'antd';
import filtersActivityList from '../../utils/filtersActivityList';
import {
  CompassFilled,
  SafetyCertificateFilled,
  TagFilled,
  DeleteFilled,
} from '@ant-design/icons';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableRowSelection,
} from 'antd/es/table/interface';
import './AdminComponentSCSS/CustomModal.scss';
import './AdminComponentSCSS/ActivityTable.scss';
import RequsetModal from './RequestModal';
import { keys } from '@mui/system';

interface user {
  id_user: string;
  user_id: string;
  name: string;
}

interface event {
  id_event: string;
  name_event: string;
  detail_event: string;
  start_date: string;
  end_date: string;
  posted_timestamp: string;
  event_type: string;
  event_img: string;
  activity_hour: number;
  event_status: boolean;
}

interface DataType1 {
  _id: string;
  user: user;
  event: event;
  start_date: string;
  end_date: string;
  uploaded_img: string;
  uploaded_pdf: string;
  date_request: string;
  status_request: string;
  type_request: string;
  permissions_request: string;
}

interface DataType {
  key: string;
  student_id: number;
  name: string;
  event_name: string;
  status: string;
}

const StudentRequestTable: FC = () => {
  const data: DataType[] = [
    {
      key: '9456',
      student_id: 63130010046,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'กำลังดำเนินการ',
    },
    {
      key: '4416',
      student_id: 63130010047,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'รับเรื่อง',
    },
    {
      key: '9455',
      student_id: 63130010048,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'รับเรื่อง',
    },
    {
      key: '1111',
      student_id: 63130010049,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'คำร้องถูกปฏิเสธ',
    },
    {
      key: '1121',
      student_id: 63130010049,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'กำลังดำเนินการ',
    },
    {
      key: '1231',
      student_id: 63130010049,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'กำลังดำเนินการ',
    },
    {
      key: '5611',
      student_id: 63130010049,
      name: 'ณัฏฐพล สุวรรโณ',
      event_name: 'ลอยกระทง',
      status: 'ส่งเรื่องแล้ว',
    },
  ];

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCurrentFilter, setIsCurrentFilter] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const FilterSelected = (value: string) => {
    switch (value) {
      case 'ล้างตัวกรอง':
        setFilteredInfo({});
        setSortedInfo({});
        setIsCurrentFilter(false);
        break;
      default:
        setIsCurrentFilter(true);
        setFilteredInfo({
          filteredValue: filteredInfo.status,
          status: [value],
        });
    }
    filtersActivityList(`${value}`);
  };

  const ColorTag = (value: string) => {
    switch (value) {
      case 'รับเรื่อง':
        return (
          <>
            <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
              {value}
            </div>
          </>
        );
        break;
      case 'กำลังดำเนินการ':
        return (
          <>
            <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-amber-200 text-amber-700 rounded-full">
              {value}
            </div>
          </>
        );
        break;
      case 'ส่งเรื่องแล้ว':
        return (
          <>
            <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
              {value}
            </div>
          </>
        );
        break;
      default:
        return (
          <>
            <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
              {value}
            </div>
          </>
        );
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'รหัสประจำตัว',
      dataIndex: 'student_id',
      key: 'student_id',
      width: '20%',
    },
    {
      title: 'ชื่อผู้ยื่นคำร้อง',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'ชื่อกิจกรรม',
      dataIndex: 'event_name',
      key: 'event_name',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'รับเรื่อง', value: 'รับเรื่อง' },
        { text: 'รอดำเนินการ', value: 'รอดำเนินการ' },
        { text: 'ส่งเรื่องแล้ว', value: 'ส่งเรื่องแล้ว' },
        { text: 'คำร้องถูกปฏิเสธ', value: 'คำร้องถูกปฏิเสธ' },
      ],
      render: (_, record) => <>{ColorTag(record.status.toString())}</>,
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string, record) => record.status.includes(value),
      ellipsis: true,
    },
    {
      title: 'จัดการ',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (_, record) => (
        <>
          <Space size="small">
            <button
              type="button"
              onClick={showModal}
              className="font-Kanit inline-flex items-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600"
            >
              รับคำร้อง
            </button>
            <Modal
              centered={true}
              title={`คำร้องที่  #${record.key}`}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={
                <div className="flex justify-end mt-10">
                  <button className="mr-2 font-Kanit inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-red-400 h-12">
                    ปฎิเสธคำร้อง
                  </button>
                  <button className="font-Kanit inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-green-500 h-12">
                    รับคำร้อง
                  </button>
                </div>
              }
            >
              <p className="font-semibold mt-8 text-lg">
                {`ผู้ยื่นคำร้อง : `}
                <span className="font-normal ml-2">{record.name}</span>
              </p>
              <p className="font-semibold mt-2 text-lg">
                {`กิจกรรมที่เข้าร่วม : `}
                <span className="font-normal ml-2">{`COSCI FESTIVAL (CO-FEST) : Chapter 3 - Neon Cosiety`}</span>
              </p>
              <p className="font-semibold mt-2 text-lg">
                {`หมวดหมู่กิจกรรม : `}
                <span className="ml-2 bg-red-200 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  หมวดศิลปะวัฒนธรรม
                </span>
              </p>
              <p className="font-semibold mt-2 text-lg">
                {`จำนวนชั่วโมง : `}
                <span className="font-normal ml-2">{`-`}</span>
              </p>
              <p className="font-semibold mt-2 text-lg">
                {`วันที่เข้าร่วม : `}
                <span className="font-normal ml-2">{``}</span>
              </p>
              <p className="font-semibold mt-8 text-lg">
                {`หลักฐานการเข้าร่วมกิจกรรม `}
              </p>

              <Image
                className="mt-2 rounded-lg"
                src="http://cosci.swu.ac.th/storage/blogs/MEnDnGAI0AhTCbhWR6D8rZi1hUAw5bedxWQU1ZG4.png"
              />
            </Modal>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<CompassFilled />}
          className={`font-Kanit h-10  inline-flex items-center rounded-md border border-transparentpx-4 py-2 text-sm font-medium bg-sky-100 text-sky-700 shadow-sm hover:bg-sky-600`}
          onClick={() => FilterSelected('รับเรื่อง')}
        >
          รับเรื่อง
        </Button>
        <Button
          icon={<SafetyCertificateFilled />}
          className="font-Kanit h-10 inline-flex items-center rounded-md border border-transparent bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 hover:text-white shadow-sm hover:bg-amber-600 "
          onClick={() => FilterSelected('กำลังดำเนินการ')}
        >
          กำลังดำเนินการ
        </Button>
        <Button
          icon={<TagFilled />}
          className="font-Kanit h-10  inline-flex items-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-600 "
          onClick={() => FilterSelected('ส่งเรื่องแล้ว')}
        >
          ส่งเรื่องแล้ว
        </Button>
        <Button
          icon={<TagFilled />}
          className="font-Kanit h-10  inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-600 "
          onClick={() => FilterSelected('คำร้องถูกปฏิเสธ')}
        >
          คำร้องถูกปฏิเสธ
        </Button>

        <Button
          icon={<DeleteFilled />}
          className="font-Kanit h-10  inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-200 hover:text-red-700"
          onClick={() => FilterSelected('ล้างตัวกรอง')}
        >
          ล้างตัวกรอง
        </Button>
      </Space>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default StudentRequestTable;
