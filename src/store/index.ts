import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApi } from '../services/api/authApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;