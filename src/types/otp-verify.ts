export interface Otp {
  email: string;
  otp: string;
}

export interface OtpResult {
  result: string;
  message: string;
  data: object;
}
