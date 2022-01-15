import { configureStore } from '@reduxjs/toolkit';
import { timesheetSliceReducer } from '../slices/timesheetsSlice';

export const store = configureStore({
  reducer: {
    timesheet: timesheetSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
