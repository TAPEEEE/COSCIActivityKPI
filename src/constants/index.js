// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED';
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR';
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING';
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION';
export const E_USER_CANCELLED = 'E_USER_CANCELLED';
export const E_UNKNOWN = 'E_UNKNOWN';
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR';
export const TIMEOUT_NETWORK = 'ECONNABORTED'; // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK';

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  'Cannot connect to server, Please try again.';
export const NETWORK_TIMEOUT_MESSAGE =
  'A network timeout has occurred, Please try again.';
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  'An error has occurred. The photo was unable to upload.';

export const apiUrl = 'http://localhost:8081/api/';
export const imageUrl = 'http://localhost:8081/';

export const server = {
  LOGIN_URL: `auth/login-teacher`,
  GET_KPI: `teacher/kpi-active`,
  TEACHER_OTP: `auth/verifyteacher`,
  GET_TEAHER_INFOMATION: `auth/getteacher-uploaded`,
  REFRESH_TOKEN_URL: `refresh/token`,
  REGISTER_URL: `auth/teacher-register`,
  GET_SINGLE_KPI: `teacher/event/`,
  EDIT_KPI: `admin/edit-event`,
  ADD_KPI: `admin/add-activity`,
  UPLOAD_IMG: `file/uploadimg`,
  TOKEN_KEY: `token`,
  TEACHER_HISTORY: `teacher/request-history`,
  REFRESH_TOKEN_KEY: `refresh_token`,
  RESEND_OTP_TEACHER: `auth/verify/resendteacher`,
  TEACHER_ADD_REQUEST: `teacher/request`,
  TEACHER_FORGOTPASSWORD: `auth/forgotpassword-teacher`,
  TEACHER_CHANGEPASSWORD: `teacher/changepassword`,
};
