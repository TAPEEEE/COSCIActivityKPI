import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { history } from '../..';
import { server } from '../../constants';
import {
  LoginResult,
  Register,
  RegisterResult,
} from '../../types/auth-result.type';
import { User } from '../../types/user.type';
import { Otp, OtpResult, ResendOtp } from '../../types/otp-verify';
import { httpClient } from '../../utils/HttpClient';
import { RootState } from '../store';

export interface AuthState {
  loginResult?: LoginResult;
  registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isNotVetify: boolean;
  isSessionExp: boolean;
  errorMessage: string;
}

export interface UserCurrent {
  email: string;
  img_user: string;
  name: string;
  role: string;
  tel: string;
  user_id: string;
  _id: string;
}

const initial: AuthState = {
  isAuthenticating: true,
  isAuthented: false,
  isError: false,
  isAdmin: false,
  isTeacher: false,
  isNotVetify: false,
  isSessionExp: false,
  isLoading: false,
  errorMessage: '',
};

const initialUser: UserCurrent = {
  _id: '',
  user_id: '',
  name: '',
  role: '',
  email: '',
  tel: '',
  img_user: '',
};

export const login = createAsyncThunk('auth/login', async (values: User) => {
  const result = await httpClient.post<LoginResult>(server.LOGIN_URL, values);
  const { token } = result.data;
  if (token) {
    localStorage.setItem(server.TOKEN_KEY, token);
  }
  localStorage.setItem('user', JSON.stringify(result.data.data));
  return result.data;
});

export const otpVerify = createAsyncThunk('auth/otp', async (values: Otp) => {
  const result = await httpClient.post<OtpResult>(server.TEACHER_OTP, values);
  const { token } = result.data;
  if (token) {
    localStorage.setItem(server.TOKEN_KEY, token);
  }
  localStorage.setItem('user', JSON.stringify(result.data.data));
  return result.data;
});

export const otpResend = createAsyncThunk(
  'auth/resendotp',
  async (formData: ResendOtp) => {
    await httpClient.post(server.RESEND_OTP_TEACHER, formData);
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (value: Register) => {
    const result = await httpClient.patch<RegisterResult>(
      server.REGISTER_URL,
      value,
    );
    console.log(result);
    return result.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    logout: (state, action: PayloadAction<void>) => {
      state.isAuthented = false;
      state.isError = false;
      state.isAdmin = false;
      state.isTeacher = false;
      state.isNotVetify = false;
      localStorage.removeItem(server.TOKEN_KEY);
      localStorage.removeItem('user');
      history.push('/login');
    },
    sessionExp: (state, action: PayloadAction<void>) => {
      state.isAuthented = false;
      state.isError = false;
      state.isAdmin = false;
      state.isTeacher = false;
      state.isNotVetify = false;
      state.isSessionExp = true;
      localStorage.removeItem(server.TOKEN_KEY);
      localStorage.removeItem('user');
      history.push('/login');
    },
    relogin: (state: AuthState, action: PayloadAction<void>) => {
      const _token = localStorage.getItem(server.TOKEN_KEY);
      const user = JSON.parse(localStorage.getItem('user')!);
      if (_token && user) {
        state.loginResult = {
          refreshToken: '',
          token: _token,
          result: 'OK',
          data: user,
        };
        state.isAuthented = true;
        if (user.role === 'admin') {
          state.isAdmin = true;
        } else {
          state.isTeacher = true;
        }
      }
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isSessionExp = false;
      state.isLoading = false;
      const user = JSON.parse(localStorage.getItem('user')!);
      if (action.payload.result === 'OK') {
        state.isError = false;
        state.loginResult = action.payload;
        state.isAuthented = true;
        if (action.payload.data.role === 'admin') {
          state.isAdmin = true;
        } else {
          state.isTeacher = true;
        }
      } else if (action.payload.result === 'Wait') {
        state.isError = false;
        state.isNotVetify = true;
        state.loginResult = {
          refreshToken: '',
          token: '',
          result: 'OK',
          data: user,
        };
      } else {
        state.isError = true;
        state.isAuthented = false;
      }
      state.isAuthenticating = false;
    });

    builder.addCase(login.pending, (state, action) => {
      state.isSessionExp = false;
      state.isLoading = true;
    });

    builder.addCase(otpVerify.pending, (state, action) => {
      state.isSessionExp = false;
      state.isLoading = true;
    });

    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.isSessionExp = false;
      state.isLoading = false;

      if (action.payload.result === 'OK') {
        state.isAuthented = true;
        state.isError = false;
        state.loginResult = action.payload;
        if (action.payload.data.role === 'admin') {
          state.isAdmin = true;
        } else {
          state.isTeacher = true;
        }
      } else {
        state.isError = true;
        state.isAuthented = false;
      }
      state.isAuthenticating = false;
    });

    //register
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSessionExp = false;
      state.isError = action.payload.result !== 'OK';
    });

    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const { logout, relogin, sessionExp } = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;
export default authSlice.reducer;
