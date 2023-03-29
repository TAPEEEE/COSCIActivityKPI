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

export interface kpiRequestState {
  KpiRequestResult?: KpiRequestResult;
}

const initialState: KpiRequestForUsed = {
  requestData: {
    user: {
      user: {
        id_user: '',
        user_id: '',
        name: '',
      },
    },
    event: {
      event: {
        id_event: '',
        name_event: '',
        detail_event: '',
        start_date: '',
        end_date: '',
        posted_timestamp: '',
        event_type: '',
        event_img: '',
        activity_hour: 0,
        event_status: false,
        event_img_list: [],
      },
    },
    start_date: '',
    end_date: 'string',
    uploaded_img: [],
    uploaded_pdf: '',
    status_request: '',
    type_request: '',
    permissions_request: '',
    _id: '',
    date_request: '',
  },
};

// Add
export const kpiRequestAdd = createAsyncThunk(
  'request/add',
  async (formData: kpiRequestType) => {
    const result = await httpClient.post<KpiRequestResult>(
      server.TEACHER_ADD_REQUEST,
      formData,
    );
    return result.data;
  },
);

const kpiRequestSlice = createSlice({
  name: 'request',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kpiRequestAdd.fulfilled, (state, action) => {
      if (action.payload.result === 'OK') {
        state.requestData = action.payload.data;
      }
    });
  },
});

export const kpiRequestSelector = (store: RootState): KpiRequestForUsed =>
  store.kpiRequestReducer;
export default kpiRequestSlice.reducer;
