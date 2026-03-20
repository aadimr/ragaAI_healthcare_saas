import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import patientReducer from '../features/patientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;