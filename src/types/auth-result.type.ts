export interface LoginResult {
  result: string;
  token: string;
  refreshToken: string;
  data: User;
  error?: string;
}

export interface RegisterResult {
  result: string;
  error?: string;
}

export interface User {
  email: string;
  img_user: string;
  name: string;
  role: string;
  tel: string;
  user_id: string;
  _id: string;
}
