import Swal from 'sweetalert2';

export default function alertTermAndConditions(title: string) {
  let color: string;
  if (title == 'ล้างตัวกรอง') {
    color = '#FA5F55';
  } else {
    color = '#2E8B57';
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    color: 'white',
    iconColor: 'white',
    background: `${color}`,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'success',
    title: `${title} สำเร็จ`,
  });
}
