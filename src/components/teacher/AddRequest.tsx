import React, { FC, memo } from 'react';
import { DatePicker, Empty, Modal } from 'antd';
import '../../assets/css/Components.css';
import './TeacherComponentSCSS/ModalComponent.scss';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadProps, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Dragger } = Upload;
const fileList: UploadFile[] = [];

interface RequestKPIProps {
  id_event?: string;
  user_name?: string;
  user_role?: string;
  user_email?: string;
  name_event?: string;
  detail_event?: string;
  event_type?: string;
  event_img?: string;
  start_date?: string;
  end_date?: string;
  uploaded_img?: string[];
}

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddRequest: FC<RequestKPIProps> = (props) => {
  const { confirm } = Modal;
  const {
    user_name,
    user_role,
    user_email,
    name_event,
    detail_event,
    event_type,
    event_img,
    start_date,
    end_date,
    uploaded_img,
  } = props;
  const { RangePicker } = DatePicker;
  return (
    <>
      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-6 font-Kanit lg:px-16 mt-8">
        <h3 className="mb-5 text-lg font-medium text-[#00567e]">
          ส่วนที่ 1: กิจกรรมที่เข้าร่วม
        </h3>
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl md:max-w-4xl mx-auto">
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

            <h3 className="text-gray-800 text-xl font-semibold my-5 line-clamp-2 ">
              {name_event}
            </h3>

            <div className="flex flex-col justify-between">
              <p className=" text-gray-500 text-sm mb-12 line-clamp-2">
                {detail_event}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-6 font-Kanit lg:px-16 mt-8">
        <h3 className="mb-5 text-lg font-medium text-[#00567e]">
          ส่วนที่ 2: ข้อมูลผู้ยื่นคำร้อง
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-4">
            <h3 className="mb-1 text-md">ชื่อ-สกุล</h3>
            <input
              value={user_name}
              disabled
              type="text"
              className="bg-gray-200 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group mb-5">
            <h3 className="mb-1 text-md">ตำแหน่ง</h3>
            <input
              value={user_role}
              disabled
              type="text"
              className="bg-gray-200 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
            />
          </div>
        </div>
        <label className="mb-1 text-md" htmlFor="activitytitle">
          Email
        </label>
        <div className="form-group mb-5">
          <input
            value={user_email}
            disabled
            name="activityTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-6 font-Kanit lg:px-16 my-8">
        <h3 className="mb-5 text-lg font-medium text-[#00567e]">
          ส่วนที่ 3: อัพโหลดหลักฐานการเข้าร่วมกิจกรรม
        </h3>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            confirm({
              title: 'เลือกรูปหลักฐานการเข้าร่วมกิจกรรม',
              content: (
                <>
                  <h1 className="font-Kanit text-gray-800 font-medium text-lg my-4">
                    อัพโหลดรูปภาพ
                  </h1>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    defaultFileList={[...fileList]}
                  >
                    <Button icon={<UploadOutlined />}>
                      อัพโหลดรูปภาพด้วยตนเอง
                    </Button>
                  </Upload>
                  <h1 className="font-Kanit text-gray-800 font-medium text-lg my-4">
                    หรือเลือกรูปภาพจากส่วนกลาง :
                  </h1>
                  <Image.PreviewGroup>
                    {uploaded_img?.length ? (
                      uploaded_img.map((index) => (
                        <div className="mx-1" key={index}>
                          <Image width={130} src={index} />
                        </div>
                      ))
                    ) : (
                      <Empty
                        className="mb-3"
                        description={'ไม่มีรูปภาพจากส่วนกลาง'}
                      />
                    )}
                  </Image.PreviewGroup>
                </>
              ),
              okText: 'ยืนยัน',
              okType: 'primary',
              cancelText: 'ยกเลิก',
              onOk() {
                console.log('OK');
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>คลิกเพื่ออัพโหลดรูปภาพ</span>
        </button>
        <div className="flex justify-end mt-12">
          <button
            type="submit"
            className="w-full md:w-60 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-xl text-base px-5 py-2.5 text-center"
          >
            ส่งคำร้องลงบันทึกกิจกรรม
          </button>
        </div>
      </div>

      {/* <Dragger {...props} className="mb-5">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger> */}
    </>
  );
};

export default memo(AddRequest);
