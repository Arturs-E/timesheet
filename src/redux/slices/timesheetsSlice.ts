import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTimesheetData, TimesheetData } from '../../helpers/get-timesheet-data';

type UpdateHoursPayload = {
  nameId: string;
  weekId: string;
  day: string;
  hours: number;
}

const initialState: TimesheetData[] = getTimesheetData();

const timesheetSlice = createSlice(({
  name: 'timesheet',
  initialState,
  reducers: {
    updateHours: (state, action: PayloadAction<UpdateHoursPayload>) => state.map((item) => {
      if (item.nameId === action.payload.nameId) {
        const hours = item.hours.map((week) => {
          if (week.weekId === action.payload.weekId) {
            const weeklyHours = week.weeklyHours.map((day) => {
              if (day.day === action.payload.day) {
                return { ...day, hoursWorked: action.payload.hours, isLoading: true };
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

const { updateHours } = timesheetSlice.actions;
const timesheetSliceReducer = timesheetSlice.reducer;

export { timesheetSliceReducer, updateHours };
