import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import TeacherNavbar from '../../components/teacher/TeacherNavbar';
import KPICards from '../../components/teacher/KPICards';
import './TeacherHome.css';
import '../../scss/KPIHome.scss';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getKpi, kpiSelector } from '../../store/slices/kpiSlice';

type StudentHomeProps = {
  //
};

const data = [
  {
    name_event:
      'วิทยาลัยนวัตกรรมสื่อสารสังคม มหาวิทยาลัยศรีนครินทรวิโรฒ ได้ร่วมทำบันทึกข้อตกลงความร่วมมือทางวิชาการ กับ บริษัท ไวซ์ไซท์ (ประเทศไทย) จำกัด',
    event_type: 'กิจกรรมเลือก',
    event_detail:
      'มาทำความรู้จักอาชีพต่างๆ ในสายงานด้านภาพยนตร์และสื่อดิจิทัล ให้เข้าใจอย่างถูกต้องเกี่ยวกับหน้าที่ต่างๆ การทำงานแต่ละตำแหน่งโดยเฉพาะ',
  },
  {
    name_event:
      'กิจกรรม 2 เตรียมพบกับการถ่ายทอดสด การริมสุขภาวะนวัตกรรมที่ดี ในหัวข้อ "Ready Warm up Workout!',
    event_type: 'กิจกรรมเลือก',
    event_detail:
      'เตรียมพบกับการถ่ายทอดสด การพูดคุยเพื่อสร้างเสริมสุขภาวะนวัตกรรมที่ดี ในหัวข้อ "Ready Warm up Workout!',
  },
  {
    name_event: 'กิจกรรม 3',
    event_type: 'กิจกรรมเลือก',
    event_detail:
      'Irure ut in ex nostru amet amet. Ullamco incididunt sit est dolor labore teur excepteur.',
  },
  {
    name_event: 'กิจกรรม 4',
    event_type: 'กิจกรรมเลือก',
    event_detail:
      'Irure ut in ex nostrud. Non eiusmod esse amet amet. Ullamco incid commodo excepteur excepteur.',
  },
  {
    name_event: 'กิจกรรม 5',
    event_type: 'กิจกรรมเลือก',
    event_detail:
      'Irure ut in ex nostrud. Non eiusmodet esse amet amet. Ullamco incident commodo excepteur excepteur.',
  },
];

const StudentHome: React.FC<any> = () => {
  const dispatch = useAppDispatch;
  const kpiReducer = useSelector(kpiSelector);

  useEffect(() => {
    dispatch(getKpi());
  }, [dispatch]);

  useEffect(() => {
    console.log(kpiReducer.kpiAllResult);
  });

  return (
    <>
      <body className="w-screen h-screen bgimg overflow-auto">
        <TeacherNavbar />
        <div className="my-auto mt-4">
          <div className="flex justify-center">
            <div className="mx-4 cardHome bg-gray-100 my-8 shadow-md rounded-lg">
              <div className="bg-[#1f2937] rounded-t-lg">
                <div className="flex justify-between">
                  <h1 className="font-Kanit text-white font-medium text-xl mx-4 my-4 pl-2 sm:text-md">
                    กิจกรรมนิสิตทั้งหมด
                  </h1>
                </div>
              </div>

              <div className="mx-5 py-5 sm:px-6 lg:px-8 mt-8">
                {data.map((item) => (
                  <KPICards
                    key={item.name_event}
                    name_event={item.name_event}
                    event_type={item.event_type}
                    event_detail={item.event_detail}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
};

export default StudentHome;
