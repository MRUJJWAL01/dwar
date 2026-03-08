import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { authApi } from '../services/api/authApi';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});