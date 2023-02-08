import Swal from 'sweetalert2';

export default function alertText() {
  Swal.fire({
    icon: 'error',
    title: 'ระบบยังไม่เปิดให้บริการ',
    showConfirmButton: false,
    timer: 3000,
  });
}
