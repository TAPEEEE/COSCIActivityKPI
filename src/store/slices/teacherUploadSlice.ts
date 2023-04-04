import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server } from '../../constants';
import { TeacherUpload, TeacherUploadResult } from '../../types/teacher-upload';
import { httpClient } from '../../utils/HttpClient';
import { RootState } from '../store';

export interface TeacherUploadState {
  teacherUploadResult?: TeacherUploadResult;
  isFind: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initial: TeacherUploadState = {
  isSuccess: false,
  isFind: false,
  isError: false,
};

export const teacherupload = createAsyncThunk(
  'auth/teacherUploaded',
  async (values: TeacherUpload) => {
    try {
      const result = await httpClient.post<TeacherUploadResult>(
        server.GET_TEAHER_INFOMATION,
        values,
      );
      const data = result.data.data;
      if (data) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
      }
      return result.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  },
);

const TeacherUploadSlice = createSlice({
  name: 'teahcerupload',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(teacherupload.fulfilled, (state, action) => {
      if (action.payload?.result === 'OK') {
        state.isFind = true;
        state.isError = false;
        state.isSuccess = false;
        state.teacherUploadResult = action.payload;
      } else if (action.payload?.result === 'nOK') {
        state.isFind = false;
        state.isError = false;
        state.isSuccess = true;
        state.teacherUploadResult = action.payload;
      } else {
        state.isError = true;
        state.isFind = false;
        state.isSuccess = false;
      }
    });
  },
});

export const teacherUploadSelector = (store: RootState) =>
  store.teacherUploadReducer;
export default TeacherUploadSlice.reducer;
