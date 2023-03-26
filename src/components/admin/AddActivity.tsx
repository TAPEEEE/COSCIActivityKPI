import React, { FC, memo } from 'react';
import { DatePicker } from 'antd';
import '../../assets/css/Components.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const fileList: UploadFile[] = [];

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

const AddActivity: FC = () => {
  const { RangePicker } = DatePicker;
  return (
    <>
      <div className="block rounded-lg shadow-lg bg-white max-w-100 p-6 font-Kanit lg:px-16">
        <Dragger {...props} className="mb-5">
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
        </Dragger>
        <form className="pt-5">
          <label className="mb-1 text-md" htmlFor="activitytitle">
            ชื่อกิจกรรม
          </label>
          <div className="form-group mb-5">
            <input
              name="activityTitle"
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
              id="exampleInput125"
              placeholder="ชื่อกิจกรรม"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-4">
              <h3 className="mb-1 text-md">กลุ่มกิจกรรม</h3>

              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a country</option>
                <option value="กิจกรรมบังคับ">กิจกรรมบังคับ</option>
                <option value="กิจกรรมเลือก">กิจกรรมเลือก</option>
                <option value="กิจกรรมบำเพ็ญประโยชน์">
                  กิจกรรมบำเพ็ญประโยชน์
                </option>
                <option value="หมวดศิลปะวัฒนธรรม">หมวดศิลปะวัฒนธรรม</option>
                <option value="หมวดกิจกรรมนิสิต">หมวดกิจกรรมนิสิต</option>
                <option value="หมวดกิจกรรมคณะ/วิทยาลัย">
                  หมวดกิจกรรมคณะ/วิทยาลัย
                </option>
              </select>
            </div>
            <div className="form-group mb-5">
              <h3 className="mb-1 text-md">จำนวนชั่วโมง</h3>
              <input
                type="number"
                className={`"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"`}
                id="exampleInput125"
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <h3 className="mb-1 text-md">
              วันเริ่มต้นกิจกรรม - สิ้นสุดกิจกรรม
            </h3>
            <RangePicker
              className="h-12 form-control  w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
              showTime
              name="date"
            />
          </div>

          <div className="form-group mb-4">
            <h3 className="mb-1 text-md">รายละเอียดกิจกรรม</h3>
            <textarea
              rows={5}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none"
              placeholder="รายละเอียดกิจกรรม"
            />
          </div>
          <div className="form-group mb-24">
            <h3 className="mb-1 text-md">อัพโหลดรูปภาพสำหรับอาจารย์</h3>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              defaultFileList={[...fileList]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(AddActivity);
