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
  KpiHistoryResult,
  KpiHistorytData,
  KpiRequestForHistoryData,
} from '../../types/kpi-history';

export interface kpiRequestHistoryState {
  kpiHistoryAll?: KpiHistorytData[];
}

const initialState: kpiRequestHistoryState = {
  kpiHistoryAll: [],
};

export const kpiHistoryGet = createAsyncThunk(
  'kpi/getAll',
  async (keyword?: string): Promise<KpiHistorytData[]> => {
    if (keyword) {
      const result = await httpClient.get<KpiHistoryResult>(
        `${server.TEACHER_HISTORY}/name/${keyword}`,
      );
      return result.data.data.data;
    } else {
      const result = await httpClient.get<KpiHistoryResult>(
        server.TEACHER_HISTORY,
      );
      return result.data.data.data;
    }
  },
);

const kpiHistorySlice = createSlice({
  name: 'requestHistory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kpiHistoryGet.fulfilled, (state, action) => {
      state.kpiHistoryAll = action.payload;
    });
  },
});

export const kpiHistorySelector = (store: RootState): kpiRequestHistoryState =>
  store.kpiHistoryReducer;
export default kpiHistorySlice.reducer;
