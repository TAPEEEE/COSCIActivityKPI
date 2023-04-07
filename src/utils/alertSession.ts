import Swal from 'sweetalert2';

export default function alertSession(title: string, text: string) {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
  });
}
