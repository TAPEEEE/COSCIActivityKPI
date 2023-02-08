import React, { FC, useState } from 'react';
import { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
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
} from 'antd/es/table/interface';

import './ActivityTable.scss';

interface DataType {
  key: string;
  activityimage: string;
  name: string;
  activitycategories: string[];
  status: boolean;
}

const TableCompo: FC = () => {
  const data: DataType[] = [
    {
      key: '1',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'ลอยกระทง',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: true,
    },
    {
      key: '2',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'Cosci Open House',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: true,
    },
    {
      key: '3',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'ลอยกระทง',
      activitycategories: ['หมวดกิจกรรมนิสิต'],
      status: false,
    },
    {
      key: '4',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'COSCI Workshop',
      activitycategories: ['หมวดกิจกรรมคณะ/วิทยาลัย'],
      status: false,
    },
    {
      key: '5',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'ลอยกระทง',
      activitycategories: ['หมวดกิจกรรมคณะ/วิทยาลัย'],
      status: true,
    },
    {
      key: '6',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'ลอยกระทง',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: true,
    },
    {
      key: '7',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'Cosci Open House',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: true,
    },
    {
      key: '8',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'ลอยกระทง',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: false,
    },
    {
      key: '9',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'COSCI Workshop',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: false,
    },
    {
      key: '10',
      activityimage:
        'https://media.discordapp.net/attachments/789137436562685973/1037022084360048670/Component_12.png',
      name: 'ลอยกระทง',
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
      status: true,
    },
  ];

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    filtersActivityList('ล้างตัวกรอง');
    // console.log(activityListData);
  };

  const setCatFilter1 = () => {
    setFilteredInfo({
      filteredValue: filteredInfo.activitycategories,
      activitycategories: ['หมวดศิลปะวัฒนธรรม'],
    });
    filtersActivityList('ฟิลเตอร์เป็นหมวดศิลปะวัฒนธรรม');
  };

  const setCatFilter2 = () => {
    setFilteredInfo({
      filteredValue: filteredInfo.activitycategories,
      activitycategories: ['หมวดกิจกรรมคณะ/วิทยาลัย'],
    });
    filtersActivityList('ฟิลเตอร์เป็นหมวดกิจกรรมคณะ/วิทยาลัย');
  };

  const setCatFilter3 = () => {
    setFilteredInfo({
      filteredValue: filteredInfo.activitycategories,
      activitycategories: ['หมวดกิจกรรมนิสิต'],
    });
    filtersActivityList('ฟิลเตอร์เป็นหมวดกิจกรรมนิสิต');
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'รูปภาพกิจกรรม',
      dataIndex: 'activityimage',
      key: 'activityimage',
      render: (_, record) => (
        <img className="w-2/3" src={record.activityimage} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ประเภทกิจกรรม',
      dataIndex: 'activitycategories',
      key: 'activitycategories',

      filters: [
        { text: 'กิจกรรมเลือก', value: 'กิจกรรมเลือก' },
        { text: 'กิจกรรมบังคับ', value: 'กิจกรรมบังคับ' },
        { text: 'กิจกรรมบำเพ็ญประโยชน์', value: 'กิจกรรมบำเพ็ญประโยชน์' },
      ],
      // render: (activitycategories: string[]) => (
      //   <span>
      //     {activitycategories.map((activitycategories) => {
      //       let color = '';
      //       if (activitycategories == 'กิจกรรมบังคับ') {
      //         color = 'red';
      //       } else if (activitycategories == 'กิจกรรมเลือก') {
      //         color = 'amber';
      //       } else {
      //         color = 'blue';
      //       }
      //       return (
      //         <div
      //           className={`ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${color}-200 text-${color}-700 rounded-full`}
      //         >
      //           {activitycategories}
      //         </div>
      //       );
      //     })}
      //   </span>
      // ),

      filteredValue: filteredInfo.activitycategories || null,
      onFilter: (value: string, record) =>
        record.activitycategories.includes(value),
      ellipsis: true,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',

      filters: [
        { text: 'ดำเนินการอยู่', value: 'true' },
        { text: 'กิจกรรมเสร็จสิ้น', value: 'false' },
      ],

      render: (_, record) => (
        <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
          {record.status.toString()}
        </div>
      ),
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string, record) =>
        record.status.toString().includes(value),
      ellipsis: true,
    },
    {
      title: 'จัดการ',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <button
            // onClick={handleClick}
            type="button"
            className="font-Kanit inline-flex items-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600"
          >
            แก้ไข
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<CompassFilled />}
          className="font-Kanit h-10  inline-flex items-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-700 "
          onClick={setCatFilter1}
        >
          หมวดศิลปะวัฒนธรรม
        </Button>
        <Button
          icon={<SafetyCertificateFilled />}
          className="font-Kanit h-10 inline-flex items-center rounded-md border border-transparent bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 hover:text-white shadow-sm hover:bg-amber-700 "
          onClick={setCatFilter2}
        >
          หมวดกิจกรรมคณะ/วิทยาลัย
        </Button>
        <Button
          icon={<TagFilled />}
          className="font-Kanit h-10  inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-700 "
          onClick={setCatFilter3}
        >
          หมวดกิจกรรมนิสิต
        </Button>

        <Button
          icon={<DeleteFilled />}
          className="font-Kanit h-10  inline-flex items-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-500 hover:text-white"
          onClick={clearAll}
        >
          ล้างตัวกรอง
        </Button>
      </Space>
      <Table
        pagination={{ pageSize: 4 }}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
    </>
  );
};

export default TableCompo;
