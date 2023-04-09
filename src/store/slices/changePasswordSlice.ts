import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../../constants';
import { Product } from '../../types/product.type';
import { httpClient } from '../../utils/HttpClient';
import { RootState, store, useAppDispatch } from '../store';
import { history } from '../../index';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '../../types/changepassword.type';

export interface ChangePasswordState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: ChangePasswordState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const ChangePasswordPatch = createAsyncThunk(
  'teacher/changepassword',
  async (formData: ChangePasswordRequest) => {
    try {
      const result = await httpClient.patch<ChangePasswordResponse>(
        server.TEACHER_CHANGEPASSWORD,
        formData,
      );
      return result.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  },
);

const ChangePasswordSlice = createSlice({
  name: 'changepassword',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ChangePasswordPatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (action.payload?.result === 'OK') {
        state.isSuccess = true;
      } else if (action.payload?.result === 'nOK') {
        state.isError = true;
        state.isSuccess = false;
      }
    });

    builder.addCase(ChangePasswordPatch.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const ChangePasswordSelector = (store: RootState): ChangePasswordState =>
  store.changePasswordReducer;
export default ChangePasswordSlice.reducer;
