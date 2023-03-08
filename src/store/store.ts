import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './slices/authSlice';
import otpReducer from './slices/otpSlice';
import teacherUploadReducer from './slices/teacherUploadSlice';

const reducer = {
  authReducer,
  otpReducer,
  teacherUploadReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
