import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../../constants';
import { Product } from '../../types/product.type';
import { httpClient } from '../../utils/HttpClient';
import { RootState, store, useAppDispatch } from '../store';
import { history } from '../../index';

import {
  KpiRequestData,
  KpiRequestForUsed,
  KpiRequestResult,
  kpiRequestType,
} from '../../types/kpi-request';
import {
  ForgotPasswordData,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '../../types/forgotPassword.type';

export interface forgotPasswordState {
  ForgotPasswordResult?: ForgotPasswordData;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isNotFound: boolean;
}

const initialState: forgotPasswordState = {
  ForgotPasswordResult: {
    _id: '',
    user_id: '',
    name: '',
    role: '',
    email: '',
    tel: '',
    img_user: '',
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  isNotFound: false,
};

export const forgotPasswordSent = createAsyncThunk(
  'forgotpassword/req',
  async (formData: ForgotPasswordRequest) => {
    try {
      const result = await httpClient.patch<ForgotPasswordResponse>(
        server.TEACHER_FORGOTPASSWORD,
        formData,
      );
      return result.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  },
);

const teacherPasswordSlice = createSlice({
  name: 'forgotpassword',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPasswordSent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isNotFound = false;
      if (action.payload?.result === 'OK') {
        state.isSuccess = true;
        state.ForgotPasswordResult = action.payload.data;
      } else if (action.payload?.result === 'Not found') {
        state.isNotFound = true;
        state.isSuccess = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
      }
    });

    builder.addCase(forgotPasswordSent.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const TeacherPasswordSelector = (
  store: RootState,
): forgotPasswordState => store.forGotPasswordReducer;
export default teacherPasswordSlice.reducer;
