import Swal from 'sweetalert2';

export default function alertSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'เพิ่มกิจกรรมสำเร็จ',
    showConfirmButton: false,
    timer: 2000,
  });
}
