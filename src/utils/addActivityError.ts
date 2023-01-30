import Swal from 'sweetalert2';

export default function alertText() {
  Swal.fire({
    icon: 'error',
    title: 'เกิดข้อผิดพลาด',
    text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    showConfirmButton: false,
    timer: 2000,
  });
}
