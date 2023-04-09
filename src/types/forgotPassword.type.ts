export interface ForgotPasswordRequest {
  user_id: string;
}

export interface ForgotPasswordResponse {
  result: string;
  message: string;
  data: ForgotPasswordData;
}

export interface ForgotPasswordData {
  _id: string;
  user_id: string;
  name: string;
  role: string;
  email: string;
  tel: string;
  img_user: string;
}
