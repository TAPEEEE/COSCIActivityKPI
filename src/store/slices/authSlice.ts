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

export interface AuthState {
  loginResult?: LoginResult;
  registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isNotVetify: boolean;
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

export const register = createAsyncThunk(
  'auth/register',
  async (value: User) => {
    const result = await httpClient.post<RegisterResult>(
      server.REGISTER_URL,
      value,
    );

    if (result.data.result === 'OK') {
      history.back();
    }
    return result.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    otpClear: (state, action: PayloadAction<void>) => {
      state.isNotVetify = false;
      localStorage.removeItem(server.TOKEN_KEY);
      localStorage.removeItem('user');
      history.push('/');
    },
    logout: (state, action: PayloadAction<void>) => {
      state.isAuthented = false;
      state.isError = false;
      state.isAdmin = false;
      state.isTeacher = false;
      localStorage.removeItem(server.TOKEN_KEY);
      localStorage.removeItem('user');

      history.push('/login');
    },
    relogin: (state: AuthState, action: PayloadAction<void>) => {
      const _token = localStorage.getItem(server.TOKEN_KEY);
      const user = JSON.parse(localStorage.getItem('user')!);
      if (_token) {
        state.loginResult = {
          refreshToken: '',
          token: _token,
          result: 'OK',
          data: user,
        };
        state.isAuthented = true;
        console.log(user);
      }
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.fulfilled, (state, action) => {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (action.payload.result === 'OK') {
        state.isAuthented = true;
        state.isError = false;
        state.loginResult = action.payload;
        if (action.payload.data.role === 'admin') {
          state.isAdmin = true;
        } else {
          state.isTeacher = true;
        }
      } else if (action.payload.result === 'Wait') {
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

    // register
    builder.addCase(register.fulfilled, (state, action) => {
      state.isError = action.payload.result !== 'OK';
    });
  },
});

export const { logout, relogin, otpClear } = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;
export default authSlice.reducer;
