import { format } from 'date-fns';
import { getAllEmployees, getAllWeeks, getRandomHours } from '../helpers/data-helpers';

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

type DaysUpdateState = {
  [key: string]: boolean;
}

const allWeeks = getAllWeeks(5);
const allEmployees = getAllEmployees(5);

const timesheetData: TimesheetData[] = [];
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const currentDayOfTheWeek = format(new Date(), 'EEEE').toLowerCase();
const currentDaysIndex = weekdays.indexOf(currentDayOfTheWeek);

const daysUpdateState: DaysUpdateState = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

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
      if (!j) {
        if (k >= currentDaysIndex) {
          weeklyData.weeklyHours.push({ day: weekdays[k], hoursWorked: 0 });
        } else {
          weeklyData.weeklyHours.push({
            day: weekdays[k],
            hoursWorked: getRandomHours(13),
          });
        }
      } else {
        weeklyData.weeklyHours.push({
          day: weekdays[k],
          hoursWorked: getRandomHours(13),
        });
      }
    }

    personData.hours.push(weeklyData);
  }

  timesheetData.push(personData);
}

export {
  timesheetData, allEmployees, allWeeks, daysUpdateState,
};
export type { TimesheetData, TimesheetDataWeeks, DaysUpdateState };
