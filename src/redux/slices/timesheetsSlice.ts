import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { timesheetData, TimesheetData } from '../../data/timesheet-data';

type UpdateHoursPayload = {
  nameId: string;
  weekId: string;
  day: string;
  hours: number;
}

const initialState: TimesheetData[] = timesheetData;

const timesheetsSlice = createSlice(({
  name: 'timesheets',
  initialState,
  reducers: {
    updateHours: (state, action: PayloadAction<UpdateHoursPayload>) => state.map((item) => {
      if (item.nameId === action.payload.nameId) {
        const hours = item.hours.map((week) => {
          if (week.weekId === action.payload.weekId) {
            const weeklyHours = week.weeklyHours.map((day) => {
              if (day.day === action.payload.day) {
                return { ...day, hoursWorked: action.payload.hours };
              }
              return day;
            });
            return { ...week, weeklyHours };
          }
          return week;
        });
        return { ...item, hours };
      }
      return item;
    }),
  },
}));

const { updateHours } = timesheetsSlice.actions;
const timesheetsSliceReducer = timesheetsSlice.reducer;

export { timesheetsSliceReducer, updateHours };
