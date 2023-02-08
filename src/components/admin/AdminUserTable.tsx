import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import './RequestTable.scss';

interface DataType {
  user_id: string;
  name: string;
  email: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    user_id: 'co631010046',
    name: 'ณัฏฐพล สุวรรโณ',
    email: 'nattapon.tape@g.swu.ac.th',
  },
  {
    user_id: 'co631010047',
    name: 'ณัฏฐพล สุวรรโณ',
    email: 'nattapon.tape@g.swu.ac.th',
  },
  {
    user_id: 'co631010048',
    name: 'ณัฏฐพล สุวรรโณ',
    email: 'nattapon.tape@g.swu.ac.th',
  },
  {
    user_id: 'co631010049',
    name: 'ณัฏฐพล สุวรรโณ',
    email: 'nattapon.tape@g.swu.ac.th',
  },
];

const AdminUserTable: React.FC = () => {
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
      title: 'ชื่อผู้ใช้',
      dataIndex: 'user_id',
      key: 'user_id',
      width: '25%',
      ...getColumnSearchProps('user_id'),
    },
    {
      title: 'ชื่อ - สกุล',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Email (G.SWU)',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
  ];

  return (
    <>
      <Table
        pagination={{ pageSize: 15 }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default AdminUserTable;
