import { allEmployees, getAllWeeks, getRandomHours } from '../helpers/helpers';

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

const timesheetData: TimesheetData[] = [];
const weeks = getAllWeeks();
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

for (let i = 0; i < allEmployees.length; i += 1) {
  const personData: TimesheetData = {
    nameId: allEmployees[i].id, name: allEmployees[i].value, hourRate: 10, hours: [],
  };

  for (let j = 0; j < weeks.length; j += 1) {
    const weeklyData: TimesheetDataWeeks = {
      weekId: weeks[j].id,
      weekName: weeks[j].value,
      weeklyHours: [],
    };

    for (let k = 0; k < 7; k += 1) {
      weeklyData.weeklyHours.push({ day: weekdays[k], hoursWorked: getRandomHours(13) });
    }

    personData.hours.push(weeklyData);
  }

  timesheetData.push(personData);
}

export { timesheetData };
export type { TimesheetData };
