import Swal from 'sweetalert2';

export default function alertRegister(
  icon: boolean,
  title: string,
  text: string,
) {
  if (icon) {
    Swal.fire({
      icon: `success`,
      title: `${title}`,
      text: `${text}`,
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      icon: `error`,
      title: `${title}`,
      text: `${text}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
