import { format } from 'date-fns';
import { allEmployees, allWeeks } from '../data/timesheet-data';
import { getRandomNumberBetweenTwo } from './timesheet-helpers';

type TimesheetDataWeeks = {
  weekId: string;
  weekName: string;
  weeklyHours: {
    day: string;
    hoursWorked: number;
  }[]
}

type TimesheetData = {
  nameId: string;
  name: string;
  hourRate: number;
  hours: TimesheetDataWeeks[];
}

const getTimesheetData = (): TimesheetData[] => {
  const timesheetData: TimesheetData[] = [];
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDayOfTheWeek = format(new Date(), 'EEEE').toLowerCase();
  const currentDaysIndex = weekdays.indexOf(currentDayOfTheWeek);

  for (let i = 0; i < allEmployees.length; i += 1) {
    const personData: TimesheetData = {
      nameId: allEmployees[i].id, name: allEmployees[i].value, hourRate: getRandomNumberBetweenTwo(5, 26), hours: [],
    };

    for (let j = 0; j < allWeeks.length; j += 1) {
      const weeklyData: TimesheetDataWeeks = {
        weekId: allWeeks[j].id,
        weekName: allWeeks[j].value,
        weeklyHours: [],
      };

      for (let k = 0; k < 7; k += 1) {
        weeklyData.weeklyHours.push({
          day: weekdays[k],
          hoursWorked: !j && k >= currentDaysIndex ? 0 : getRandomNumberBetweenTwo(0, 13),
        });
      }

      personData.hours.push(weeklyData);
    }

    timesheetData.push(personData);
  }

  return timesheetData;
};
export { getTimesheetData };
export type { TimesheetData, TimesheetDataWeeks };
