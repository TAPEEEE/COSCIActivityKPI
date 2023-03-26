import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server } from '../../constants';
import { TeacherUpload, TeacherUploadResult } from '../../types/teacher-upload';
import { KpiList, KpiResult } from '../../types/teacherKpiType';
import { httpClient } from '../../utils/HttpClient';
import { RootState } from '../store';

export interface KpiState {
  kpiAllResult: KpiList[];
}

const initialState: KpiState = {
  kpiAllResult: [],
};

export const getKpi = createAsyncThunk(
  'stock/getAll',
  async (keyword?: string): Promise<KpiList[]> => {
    if (keyword) {
      const result = await httpClient.get<KpiList[]>(
        `${server.PRODUCT_URL}/name/${keyword}`,
      );
      return result.data;
    } else {
      const result = await httpClient.get<KpiList[]>(server.PRODUCT_URL);
      return result.data;
    }
  },
);

const kpiSlice = createSlice({
  name: 'kpi',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKpi.fulfilled, (state, action) => {
      state.kpiAllResult = action.payload;
    });
  },
});

export const kpiSelector = (store: RootState): KpiState => store.kpiReducer;
export default kpiSlice.reducer;
