import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import './RequestTable.scss';

interface DataType {
  student_id: number;
  name: string;
  event_name: string;
  status: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    student_id: 63130010046,
    name: 'ณัฏฐพล สุวรรโณ',
    event_name: 'ลอยกระทง',
    status: 'รับเรื่อง',
  },
  {
    student_id: 63130010047,
    name: 'ณัฏฐพล สุวรรโณ',
    event_name: 'ลอยกระทง',
    status: 'รับเรื่อง',
  },
  {
    student_id: 63130010048,
    name: 'ณัฏฐพล สุวรรโณ',
    event_name: 'ลอยกระทง',
    status: 'รับเรื่อง',
  },
  {
    student_id: 63130010049,
    name: 'ณัฏฐพล สุวรรโณ',
    event_name: 'ลอยกระทง',
    status: 'รับเรื่อง',
  },
];

const RequestTable: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'รหัสประจำตัว',
      dataIndex: 'student_id',
      key: 'student_id',
      width: '20%',
      ...getColumnSearchProps('student_id'),
    },
    {
      title: 'ชื่อผู้ยื่นคำร้อง',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
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
      render: (_, record) => (
        <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
          {record.status.toString()}
        </div>
      ),
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
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default RequestTable;
