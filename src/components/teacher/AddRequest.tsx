import React, { FC, memo, useEffect, useState } from 'react';
import { DatePicker, Empty, Modal } from 'antd';
import '../../assets/css/Components.css';
import './TeacherComponentSCSS/ModalComponent.scss';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { UploadProps, Image } from 'antd';
import moment from 'moment';
import { imageUrl, server } from '../../constants';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../store/store';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { kpiRequestAdd } from '../../store/slices/kpiRequestSlice';
import alertAdd from '../../utils/alertAdd';
import { useNavigate } from 'react-router-dom';

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

interface RequestSubmit {
  id_event?: string;
  start_date?: string;
  end_date?: string;
  status_request?: string;
  type_request?: string;
  uploaded_img?: string[];
  uploaded_pdf?: string;
}

const AddRequest: FC<RequestKPIProps> = (props) => {
  const authReducer = useSelector(authSelector);
  const navigate = useNavigate();
  const Timer = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));
  const dispatch = useAppDispatch();
  const [fileUploadStore, setFileUploadStore] = useState<any[]>([]);
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [active, setActive] = useState<string>();
  const [open, setOpen] = useState(false);
  const secectedArr: string[] = [];
  const selectedFileUpload = async (ImgName: string) => {
    for (let i = 0; i < secectedArr.length; i++) {
      if (ImgName === secectedArr[i]) {
        secectedArr.splice(i, 1);
        console.log(secectedArr);
        // setFileUpload(secectedArr);
        return;
      }
    }
    secectedArr.push(ImgName);
    message.success(`${ImgName} อัพโหลดสำเร็จ`);
    console.log(secectedArr);
  };

  const onModalOK = async () => {
    const arr: string[] = [];
    fileUploadStore.map((item) => {
      arr.push(item.response.data);
    });
    setFileUpload(arr);
    if (secectedArr) {
      setFileUpload([...arr, secectedArr]);
    }
    console.log(fileUpload.flat(6));
    setOpen(false);
  };

  const handleSubmit = async (value: RequestSubmit) => {
    await dispatch(kpiRequestAdd(value));
    alertAdd(true, 'ลงทะเบียนกิจกรรมสำเร็จ', '');
    await Timer(2000);
    navigate('/teacherhome');
  };

  const propsUpload: UploadProps = {
    name: 'file',
    action: 'http://localhost:8081/api/file/uploadimg',
    headers: {
      authorization: `Bearer ${authReducer.loginResult?.token}`,
    },
    listType: 'picture',
    openFileDialogOnClick: true,
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isHEIC = file.type === 'image/heic';
      if (file.size > 15000000) {
        message.error(`${file.name} ต้องมีขนาดน้อยกว่า 15MB`);
        return Upload.LIST_IGNORE;
      }
      if (!isPNG && !isJPEG && !isJPG && !isHEIC) {
        message.error(
          `${file.name} ต้องเป็นรูปภาพเท่านั้น (PNG, JPEG, JPG, HEIC)`,
        );
      }
      return isPNG || isJPEG || isJPG || isHEIC || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setFileUploadStore(info.fileList);
        setFileUpload([]);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} อัพโหลดสำเร็จ`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} อัพโหลดไม่สำเร็จ`);
      }
      // console.log(fileUploadStore);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  const {
    id_event,
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
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            setOpen(true);
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
        <>
          <Modal
            open={open}
            onOk={() => onModalOK()}
            closable={false}
            onCancel={async () => {
              await setFileUpload([]);
              setOpen(false);
            }}
            width={700}
          >
            <h1 className="font-Kanit text-gray-800 font-medium text-lg my-4">
              อัพโหลดรูปภาพ
            </h1>
            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>อัพโหลดรูปภาพด้วยตนเอง</Button>
            </Upload>
            <h1 className="font-Kanit text-gray-800 font-medium text-lg my-4">
              หรือเลือกรูปภาพจากส่วนกลาง :
            </h1>

            <Image.PreviewGroup>
              {uploaded_img?.length ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3 my-5">
                    {uploaded_img.map((index) => (
                      <img
                        onClick={() => selectedFileUpload(index)}
                        key={index}
                        className={`object-cover w-auto h-auto rounded-lg focus:ring-blue-700 hover:opacity-70 hover:bg-opacity-95 hover:bg-black`}
                        src={`${imageUrl}${index}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Empty
                  className="my-5"
                  description={'ไม่มีรูปภาพจากส่วนกลาง'}
                />
              )}
            </Image.PreviewGroup>
          </Modal>
        </>
        {fileUpload?.length ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-5">
              <Image.PreviewGroup>
                {fileUpload.flat(5).map((index) => (
                  <Image
                    key={index}
                    className="object-cover w-auto h-52 rounded-lg"
                    src={`${imageUrl}${index}`}
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          </>
        ) : (
          <Empty className="my-5" description={'ยังไม่มีรูปภาพที่อัพโหลด'} />
        )}

        <div className="flex justify-end mt-12">
          <button
            type="submit"
            onClick={() =>
              handleSubmit({
                id_event: id_event,
                start_date: start_date,
                end_date: end_date,
                status_request: 'สำเร็จ',
                type_request: event_type,
                uploaded_img: fileUpload.flat(),
                uploaded_pdf: 'null',
              })
            }
            className="w-full md:w-60 text-white bg-[#006b9c] hover:bg-[#00567e] focus:ring-4 font-medium rounded-xl text-base px-5 py-2.5 text-center"
          >
            ส่งคำร้องลงบันทึกกิจกรรม
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(AddRequest);
