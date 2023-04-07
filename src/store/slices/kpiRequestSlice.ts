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
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: object;
}

const initialState: kpiRequestState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: {},
};

// Add
export const kpiRequestAdd = createAsyncThunk(
  'request/add',
  async (formData: kpiRequestType) => {
    try {
      const result = await httpClient.post<KpiRequestResult>(
        server.TEACHER_ADD_REQUEST,
        formData,
      );
      return result.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  },
);

const kpiRequestSlice = createSlice({
  name: 'request',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kpiRequestAdd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (action.payload?.result === 'OK') {
        state.isSuccess = true;
      } else {
        state.isError = true;
      }
    });

    builder.addCase(kpiRequestAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(kpiRequestAdd.rejected, (state, action) => {
      state.errorMessage = action.error;
      state.isError = true;
    });
  },
});

export const kpiRequestSelector = (store: RootState): kpiRequestState =>
  store.kpiRequestReducer;
export default kpiRequestSlice.reducer;
