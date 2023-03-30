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
  KpiRequestForHistory,
  userGet,
} from '../../types/kpi-history';

export interface kpiRequestState {
  KpiHistoryResult?: KpiHistoryResult;
}

const initialState: KpiRequestForHistory = {
  requestData: {
    _id: '',
    user: {
      id_user: '',
      user_id: '',
      name: '',
    },
    event: {
      id_event: '',
      name_event: '',
      detail_event: '',
      start_date: '',
      end_date: '',
      posted_timestamp: '',
      event_type: '',
      event_img: '',
      activity_hour: 1,
      event_status: true,
      event_img_list: [],
    },
    start_date: '',
    end_date: '',
    uploaded_img: [],
    uploaded_pdf: '',
    date_request: '',
    status_request: '',
    type_request: '',
    permissions_request: '',
  },
};

// Add
export const kpiHistoryGet = createAsyncThunk(
  'history/get',
  async (formData: userGet) => {
    const result = await httpClient.post(server.TEACHER_HISTORY, formData);
    return result.data.data;
  },
);

const kpiHistorySlice = createSlice({
  name: 'requestHistory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kpiHistoryGet.fulfilled, (state, action) => {
      state.requestData = action.payload.data;
    });
  },
});

export const kpiHistorySelector = (store: RootState): KpiRequestForHistory =>
  store.kpiHistoryReducer;
export default kpiHistorySlice.reducer;
