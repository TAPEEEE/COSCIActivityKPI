import Swal from 'sweetalert2';
import './CustomAlert.scss';

export default function alertTermAndConditions() {
  Swal.fire({
    title: 'เงื่อนไขและข้อตกลง',
    html:
      '<b>โปรดอ่านและทำความเข้าใจข้อความต่อไปนี้ เมื่อท่านยอมรับและสมัครเป็นสมาชิกแล้ว เราจะถือว่าท่านเข้าใจและยินยอมปฏิบัติตามเงื่อนไขและข้อตกลงนี้ทุกประการ</b> ' +
      '<br>' +
      '<br>' +
      '<ol>' +
      '<li>1. การลงทะเบียนสมัครเป็นสมาชิกเพื่อใช้บริการเว็บไซต์นี้ ท่านจะต้องเป็นบุคคลากรหรือนิสิตชั้นปีที่ 3 ของวิทยาลัยนวัตกรรมสื่อสารสังคม มหาวิทยาลัยศรีนครินทรวิโรฒ โดยเราจะขอเก็บรวบรวมข้อมูลส่วนตัวของท่านบางส่วน เพื่อใช้ในการวิเคราะห์ ประมวลผล และดำเนินการเกี่ยวกับการฝึกงานของนิสิตวิทยาลัยนวัตกรรมสื่อสารสังคม มหาวิทยาลัยศรีนครินทรวิโรฒ</li>' +
      '<br>' +
      '<li>2. เมื่อท่านเข้าใช้งานเว็บไซด์ ข้อมูลการใช้งานของท่าน เช่น ชื่อผู้ใช้ ระยะเวลาการใช้งาน เป็นต้น จะถูกบันทึกผ่านทาง Cookies หรือ Session ซึ่งระบบจะทำการเก็บข้อมูลเหล่านี้ระหว่างท่านเข้าใช้งานโดยอัตโนมัติ</li>' +
      '<br>' +
      '<li> 3. หากท่านมีชื่อผู้ใช้และรหัสผ่านสำหรับเข้าใช้บริการเว็บไซต์ ท่านมีหน้าที่ที่จะเก็บรักษาข้อมูลดังกล่าวของท่านให้ปลอดภัยและเป็นความลับ เพื่อที่จะป้องกันบัญชีของท่านจากผู้อื่นที่ไม่มีอำนาจ หากท่านเข้าสู่ระบบแล้วไม่มีการใช้งาน เว็บไซต์จะทำการนำท่านออกจากระบบโดยอัตโนมัติ</li>' +
      '<br>' +
      '<li>4. เราจะพยายามให้ดีที่สุดเพื่อทำให้ข้อมูลส่วนบุคคลของท่านที่เราได้ควบคุมไว้ มีความถูกต้อง ครบถ้วน และแม่นยำ อย่างไรก็ตาม เป็นหน้าที่ของท่านที่จะรับรองว่าข้อมูลของท่านถูกต้องและครบถ้วน รวมถึงการแก้ไขและปรับปรุงข้อมูลของท่านให้เป็นปัจจุบัน</li>' +
      '<br>' +
      '<li>5. หากท่านทำการเชื่อมโยงไปยังเว็บไซต์อื่นๆ นอกเว็บไซต์นี้ เราไม่มีส่วนในความรับผิดชอบใดๆ เกี่ยวกับข้อมูลส่วนบุคคลของท่านในการใช้บริการเว็บไซต์นั้นๆ ทั้งนี้ กรุณาอ่านและทำความเข้าใจนโยบายความเป็นส่วนตัวของเว็บไซต์ที่ท่านเข้าเยี่ยมชมหรือเข้ารับบริการดังกล่าวทุกครั้ง</li>' +
      '<ol>' +
      '<br>' +
      '<b>ระบบบริหารจัดการกิจกรรมนิสิตและบุคลากร</b>' +
      '<br>' +
      '<b>วิทยาลัยนวัตกรรมสื่อสารสังคม มหาวิทยาลัยศรีนครินทรวิโรฒ</b>',
    width: 1000,
    showCancelButton: true,
    cancelButtonText: 'ย้อนกลับ',
    confirmButtonColor: 'green',
    confirmButtonText: 'ยอมรับข้อตกลง',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/register`;
    }
  });
}