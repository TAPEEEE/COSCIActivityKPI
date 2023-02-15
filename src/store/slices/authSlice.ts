import { UserCircleIcon } from '@heroicons/react/24/outline';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { history } from '../..';
import { server } from '../../constants';
import { LoginResult, RegisterResult } from '../../types/auth-result.type';
import { User } from '../../types/user.type';
import { httpClient } from '../../utils/HttpClient';
import { RootState } from '../store';

export interface AuthState {
  loginResult?: LoginResult;
  registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
  isAdmin: boolean;
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
};

const initialUser: UserCurrent = {
  email: '',
  img_user: '',
  name: '',
  role: '',
  tel: '',
  user_id: '',
  _id: '',
};

export const login = createAsyncThunk('auth/login', async (values: User) => {
  const result = await httpClient.post<LoginResult>(server.LOGIN_URL, values);
  const { token } = result.data;
  if (token) {
    localStorage.setItem(server.TOKEN_KEY, token);
  }
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
    logout: (state, action: PayloadAction<void>) => {
      state.isAuthented = false;
      state.isError = false;
      localStorage.removeItem(server.TOKEN_KEY);
      history.push('/login');
    },
    relogin: (state: AuthState, action: PayloadAction<void>) => {
      const _token = localStorage.getItem(server.TOKEN_KEY);
      if (_token) {
        state.loginResult = {
          refreshToken: '',
          token: _token,
          result: 'OK',
          data: initialUser,
        };
        state.isAuthented = true;
      }
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.result === 'OK') {
        state.isAuthented = true;
        state.isError = false;
        state.loginResult = action.payload;
        if (action.payload.data.role == 'admin') {
          state.isAdmin = true;
        }
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

export const { logout, relogin } = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;
export default authSlice.reducer;
