import { configureStore } from '@reduxjs/toolkit';
import { timesheetsSliceReducer } from '../slices/timesheetsSlice';

export const store = configureStore({
  reducer: {
    timesheets: timesheetsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
