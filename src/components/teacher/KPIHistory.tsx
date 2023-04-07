import React, { FC, useRef, useState } from 'react';
import {
  ConfigProvider,
  Empty,
  Input,
  InputRef,
  Modal,
  TableProps,
} from 'antd';
import { Button, Space, Table, Image } from 'antd';
import { SearchOutlined, CheckCircleFilled } from '@ant-design/icons';
import filtersActivityList from '../../utils/filtersActivityList';
import {
  CompassFilled,
  SafetyCertificateFilled,
  TagFilled,
  DeleteFilled,
} from '@ant-design/icons';
import type {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import './TeacherComponentSCSS/ModalComponent.scss';
import './TeacherComponentSCSS/TeacherTable.scss';
import { KpiHistorytData } from '../../types/kpi-history';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { AudioOutlined } from '@ant-design/icons';
import { imageUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { kpiHistorySelector } from '../../store/slices/kpiHistorySlice';
import 'moment/locale/th';

interface Data {
  KpiHistorytData?: KpiHistorytData[];
}

type DataIndex = keyof KpiHistorytData;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const KPIHistory: FC<Data> = (props) => {
  const navigate = useNavigate();
  const { KpiHistorytData } = props;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const kpiReducer = useSelector(kpiHistorySelector);
  const { confirm } = Modal;

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
  ): ColumnType<KpiHistorytData> => ({
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
          placeholder={`ค้นหากิจกรรม`}
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
            ค้นหา
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            ล้างคำค้นหา
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

  const columns: ColumnsType<KpiHistorytData> = [
    {
      title: 'เวลา',
      dataIndex: 'date_request',
      key: 'date_request',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        moment(a.date_request).unix() - moment(b.date_request).unix(),
      render: (_, record) => (
        <div className="">
          {moment(record.date_request).add(543, 'year').format('DD MMMM YYYY')}
        </div>
      ),
    },
    {
      title: 'ชื่อกิจกรรม',
      dataIndex: 'name_event',
      key: 'name_event',
      ...getColumnSearchProps('name_event'),

      // render: (_, record) => (
      //   <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
      //     {record.name_event}
      //   </div>
      // ),
    },

    {
      title: 'ประเภทกิจกรรม',
      dataIndex: 'event_type',
      key: 'event_type',
      width: '20%',
      filters: [
        { text: 'กิจกรรมเลือก', value: 'กิจกรรมเลือก' },
        { text: 'กิจกรรมบังคับ', value: 'กิจกรรมบังคับ' },
        { text: 'กิจกรรมบำเพ็ญประโยชน์', value: 'กิจกรรมบำเพ็ญประโยชน์' },
      ],

      // filteredValue: filteredInfo.activitycategories || null,
      // onFilter: (value: string, record) => record.event_type.includes(value),
      // ellipsis: true,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status_request',
      key: 'status_request',
      width: '15%',
      render: (_, record) => (
        <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
          {record.status_request}
        </div>
      ),
    },
    {
      title: 'จัดการ',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: '15%',
      render: (_, record) => (
        <>
          <Space size="small">
            <button
              type="button"
              onClick={() => {
                confirm({
                  title: (
                    <>
                      <h1 className="font-semibold text-lg">
                        {record.name_event}
                      </h1>
                    </>
                  ),
                  icon: <CheckCircleFilled />,
                  okText: 'ดูกิจกรรม',
                  cancelText: 'ปิด',
                  content: (
                    <>
                      <p className="font-semibold mt-5 text-lg">
                        {`กิจกรรมที่เข้าร่วม : `}
                        <span className="font-normal ml-2">
                          {record.name_event}
                        </span>
                      </p>
                      <p className="font-semibold mt-2 text-lg">
                        {`ผู้เข้าร่วมกิจกรรม : `}
                        <span className="font-normal ml-2">{record.name}</span>
                      </p>

                      <p className="font-semibold mt-2 text-lg">
                        {`หมวดหมู่กิจกรรม : `}
                        <span className="ml-2 bg-red-200 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full">
                          {record.event_type}
                        </span>
                      </p>
                      <p className="font-semibold mt-2 text-lg">
                        {`จำนวนชั่วโมง : `}
                        <span className="font-normal ml-2">
                          {record.activity_hour}
                        </span>
                      </p>
                      <p className="font-semibold mt-2 text-lg">
                        {`เวลาเริ่มกิจกรรม : `}
                        <span className="font-normal ml-2">
                          {moment(record.start_date)
                            .add(543, 'year')
                            .format('DD MMMM YYYY เวลา hh:mm')}
                        </span>
                      </p>
                      <p className="font-semibold mt-2 text-lg">
                        {`ลงทะเบียนเข้าร่วมเมื่อ : `}
                        <span className="font-normal ml-2">
                          {moment(record.date_request)
                            .add(543, 'year')
                            .format('DD MMMM YYYY เวลา hh:mm')}
                        </span>
                      </p>
                      <p className="font-semibold mt-8 text-lg">
                        {`หลักฐานการเข้าร่วมกิจกรรม `}
                      </p>
                      <Image.PreviewGroup>
                        {record.uploaded_img?.length ? (
                          <>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 my-5">
                              {record.uploaded_img.map((index) => (
                                <Image
                                  key={index}
                                  className="object-cover w-auto h-52 rounded-lg"
                                  src={`${imageUrl}${index}`}
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                          <Empty
                            className="my-5"
                            description={'ไม่มีรูปภาพที่อัพโหลด'}
                          />
                        )}
                      </Image.PreviewGroup>
                    </>
                  ),
                  width: '700',
                  onOk() {
                    navigate(`/teacher/event/${record.id_event}`);
                  },
                });
              }}
              className="font-Kanit inline-flex items-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600"
            >
              รายละเอียด
            </button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description="ไม่มีประวัติคำร้อง" className="my-52" />
        )}
      >
        <Table
          pagination={{ pageSize: 6 }}
          columns={columns}
          dataSource={KpiHistorytData}
          loading={kpiReducer.isLoading}
          // onChange={handleChange}
        />
      </ConfigProvider>
    </>
  );
};

export default KPIHistory;
