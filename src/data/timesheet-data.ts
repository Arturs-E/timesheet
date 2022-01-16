import { format } from 'date-fns';
import { getAllEmployees, getAllWeeks, getRandomHours } from '../helpers/data-helpers';

type TimesheetDataWeeks = {
  weekId: string;
  weekName: string;
  weeklyHours: {
    day: string;
    hoursWorked: number;
    isLoading: boolean;
  }[]
}

type TimesheetData = {
  nameId: string;
  name: string;
  hourRate: number;
  hours: TimesheetDataWeeks[];
}

const allWeeks = getAllWeeks();
const allEmployees = getAllEmployees();

const timesheetData: TimesheetData[] = [];
const weeks = allWeeks;
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const currentDayOfTheWeek = format(new Date(), 'EEEE').toLowerCase();
const currentDaysIndex = weekdays.indexOf(currentDayOfTheWeek);

for (let i = 0; i < allEmployees.length; i += 1) {
  const personData: TimesheetData = {
    nameId: allEmployees[i].id, name: allEmployees[i].value, hourRate: getRandomHours(20), hours: [],
  };

  for (let j = 0; j < weeks.length; j += 1) {
    const weeklyData: TimesheetDataWeeks = {
      weekId: weeks[j].id,
      weekName: weeks[j].value,
      weeklyHours: [],
    };

    for (let k = 0; k < 7; k += 1) {
      if (!j) {
        if (k >= currentDaysIndex) {
          weeklyData.weeklyHours.push({ day: weekdays[k], hoursWorked: 0, isLoading: false });
        } else {
          weeklyData.weeklyHours.push({
            day: weekdays[k],
            hoursWorked: getRandomHours(13),
            isLoading: false,
          });
        }
      } else {
        weeklyData.weeklyHours.push({
          day: weekdays[k],
          hoursWorked: getRandomHours(13),
          isLoading: false,
        });
      }
    }

    personData.hours.push(weeklyData);
  }

  timesheetData.push(personData);
}

export { timesheetData, allEmployees, allWeeks };
export type { TimesheetData, TimesheetDataWeeks };
