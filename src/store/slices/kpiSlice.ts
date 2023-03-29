import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../../constants';
import { Product } from '../../types/product.type';
import { httpClient } from '../../utils/HttpClient';
import { RootState, store, useAppDispatch } from '../store';
import { history } from '../../index';
import { KpiList, KpiResult } from '../../types/teacherKpiType';

export interface KpiState {
  kpiAllResult: KpiList[];
  kpiOneResult: KpiList | null;
}

const initialState: KpiState = {
  kpiAllResult: [],
  kpiOneResult: null,
};

// Add
export const addKpi = createAsyncThunk(
  'kpi/add',
  async (formData: FormData) => {
    await httpClient.post(server.ADD_KPI, formData);
    history.back();
    store.dispatch(getKpi());
  },
);

// Query
export const getKpi = createAsyncThunk(
  'kpi/getAll',
  async (keyword?: string): Promise<KpiList[]> => {
    if (keyword) {
      const result = await httpClient.get<KpiResult>(
        `${server.GET_KPI}/name/${keyword}`,
      );
      return result.data.data.data;
    } else {
      const result = await httpClient.get<KpiResult>(server.GET_KPI);
      return result.data.data.data;
    }
  },
);

export const getKPIById = createAsyncThunk(
  'kpi/getById',
  async (id: string): Promise<KpiList> => {
    const result = await await httpClient.get(`${server.GET_SINGLE_KPI + id}`);
    return result.data.data;
  },
);

// Delete
// export const deleteKpi = createAsyncThunk(
//   'stock/delete',
//   async (id: string) => {
//     await httpClient.delete(`${server.PRODUCT_URL}/id/${id}`);
//     store.dispatch(getKpi());
//   },
// );

// Edit
export const editProdcut = createAsyncThunk(
  'kpi/edit',
  async (formData: any) => {
    await httpClient.patch(server.EDIT_KPI, formData);
    history.back();
  },
);

const kpiSlice = createSlice({
  name: 'kpi',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getKpi
    builder.addCase(getKpi.fulfilled, (state, action) => {
      state.kpiAllResult = action.payload;
      state.kpiOneResult = initialState.kpiOneResult;
    });
    builder.addCase(getKPIById.fulfilled, (state, action) => {
      state.kpiOneResult = action.payload;
    });
  },
});

export const kpiSelector = (store: RootState): KpiState => store.kpiReducer;
export default kpiSlice.reducer;
