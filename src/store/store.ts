import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './slices/authSlice';
import teacherUploadReducer from './slices/teacherUploadSlice';
import kpiReducer from './slices/kpiSlice';
import kpiRequestReducer from './slices/kpiRequestSlice';

const reducer = {
  authReducer,
  teacherUploadReducer,
  kpiReducer,
  kpiRequestReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
