import { UserCircleIcon } from '@heroicons/react/24/outline';
import { fabClasses } from '@mui/material';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { history } from '../..';
import { server } from '../../constants';
import { LoginResult, RegisterResult } from '../../types/auth-result.type';
import { User } from '../../types/user.type';
import { Otp, OtpResult } from '../../types/otp-verify';
import { httpClient } from '../../utils/HttpClient';
import { RootState } from '../store';

export interface OtpState {
  otpResult?: OtpResult;
  isVerify: boolean;
  isError: boolean;
}

const initial: OtpState = {
  isVerify: false,
  isError: false,
};

export const opt = createAsyncThunk('auth/otp', async (values: Otp) => {
  const result = await httpClient.post<OtpResult>(server.TEACHER_OTP, values);
  return result.data;
});

const otpSlice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {},
});

export const otpSelector = (store: RootState) => store.otpReducer;
export default otpSlice.reducer;
