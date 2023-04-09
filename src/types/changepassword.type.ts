export interface ChangePasswordRequest {
  oldpassword: string;
  password: string;
  confirmpassword: string;
}

export interface ChangePasswordResponse {
  result: string;
  message: string;
  data: ChangePasswordResponseData;
}

export interface ChangePasswordResponseData {
  _id: string;
  user_id: string;
  name: string;
  password: string;
  role: string;
  email: string;
  tel: string;
  img_user: string;
}
