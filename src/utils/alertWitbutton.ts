import Swal from 'sweetalert2';

export default function alertWithButton(
  icon: boolean,
  title: string,
  text: string,
) {
  if (icon) {
    Swal.fire({
      icon: `success`,
      title: `${title}`,
      text: `${text}`,
    });
  } else {
    Swal.fire({
      icon: `error`,
      title: `${title}`,
      text: `${text}`,
    });
  }
}
