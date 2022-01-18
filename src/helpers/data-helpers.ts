import {
  endOfWeek, format, startOfWeek, subWeeks,
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Fakerator from 'fakerator';
import { allEmployees, allWeeks } from '../data/timesheet-data';

type Week = {
  id: string;
  value: string;
}

type Employee = {
  id: string;
  value: string;
}

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

const getAllWeeks = (maxNumber: number): Week[] => {
  const weeks: Week[] = [];
  const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
  const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  for (let i = 0; i < maxNumber; i += 1) {
    const monday = subWeeks(startOfThisWeek, i);
    const mondayToString = format(monday, 'dd MMM yyyy');

    const sunday = subWeeks(endOfThisWeek, i);
    const sundayToString = format(sunday, 'dd MMM yyyy');

    weeks.push(
      { id: `week${i}`, value: `${mondayToString} - ${sundayToString}` },
    );
  }
  return weeks;
};

const fakerator = Fakerator();
const getAllEmployees = (maxNumber: number): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 0; i < maxNumber; i += 1) {
    employees.push({ id: uuidv4(), value: fakerator.names.name() });
  }
  return employees;
};

const getRandomHours = (maxNumber: number): number => Math.floor(Math.random() * maxNumber);
const getRandomHourRate = (maxNumber: number): number => Math.floor(Math.random() * maxNumber + 5);

const getTimesheetData = (): TimesheetData[] => {
  const timesheetData: TimesheetData[] = [];
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDayOfTheWeek = format(new Date(), 'EEEE').toLowerCase();
  const currentDaysIndex = weekdays.indexOf(currentDayOfTheWeek);

  for (let i = 0; i < allEmployees.length; i += 1) {
    const personData: TimesheetData = {
      nameId: allEmployees[i].id, name: allEmployees[i].value, hourRate: getRandomHours(20), hours: [],
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
          hoursWorked: !j && k >= currentDaysIndex ? 0 : getRandomHours(13),
        });
      }

      personData.hours.push(weeklyData);
    }

    timesheetData.push(personData);
  }

  return timesheetData;
};

export {
  getAllWeeks,
  getAllEmployees,
  getRandomHours,
  getRandomHourRate,
  getTimesheetData,
};
export type { TimesheetData, TimesheetDataWeeks };
