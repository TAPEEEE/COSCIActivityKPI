import React, { FC, memo } from 'react';

// -[#005076]
const Footer: FC = () => {
  return (
    <footer className="p-4 sm:p-6 bg-[#151d29] font-Kanit mt-52">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bottom-0">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 ml-5">
            <a className="flex items-center">
              <img
                src="http://cosci.swu.ac.th/img/logo.svg"
                className="mr-3 h-16"
                alt=""
              />
            </a>
          </div>
          <div className="row contact-box text-white ml-5">
            <div className="col-lg-12">
              <i className="fa fa-asterisk"></i>ติดต่อสอบถาม
              <i className="fa fa-asterisk"></i>
            </div>
            <div className="col-lg-12">
              อาคารวิทยาลัยนวัตกรรมสื่อสารสังคม (ตึกริมน้ำ) &nbsp;
              <span className="nextlineSM">ฝ่ายวิชาการและวิจัย ชั้น 15</span>
            </div>
            <div className="col-lg-12">
              <u>ติดต่อในวันเวลาราชการ</u> &nbsp;
              <span className="nextlineSM">
                วันจันทร์ถึงศุกร์ เวลา 08:30น. - 16:30น.
              </span>
            </div>
            <div className="col-lg-12">
              <span className="nextlineSM">
                (ยกเว้นวันหยุดนักขัตฤกษ์) โทร 02-649-5000 ต่อ 11268
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
