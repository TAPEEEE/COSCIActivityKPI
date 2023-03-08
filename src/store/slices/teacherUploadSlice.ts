import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server } from '../../constants';
import { TeacherUpload, TeacherUploadResult } from '../../types/teacher-upload';
import { httpClient } from '../../utils/HttpClient';
import { RootState } from '../store';

export interface TeacherUploadState {
  teacherUploadResult?: TeacherUploadResult;
  isFind: boolean;
  isError: boolean;
}

const initial: TeacherUploadState = {
  isFind: false,
  isError: false,
};

export const teacherupload = createAsyncThunk(
  'auth/teacherUploaded',
  async (values: TeacherUpload) => {
    const result = await httpClient.post<TeacherUploadResult>(
      server.GET_TEAHER_INFOMATION,
      values,
    );
    console.log(values);
    // console.log(result);
    return result.data;
  },
);

const TeacherUploadSlice = createSlice({
  name: 'teahcerupload',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(teacherupload.fulfilled, (state, action) => {
      if (action.payload.result === 'OK') {
        state.isFind = true;
        state.isError = false;
        state.teacherUploadResult = action.payload;
      } else {
        state.isError = true;
        state.isFind = false;
      }
    });
  },
});

export const teacherUploadSelector = (store: RootState) =>
  store.teacherUploadReducer;
export default TeacherUploadSlice.reducer;
