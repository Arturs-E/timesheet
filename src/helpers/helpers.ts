import {
  startOfWeek, endOfWeek, subWeeks, format,
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

type Week = {
  id: string;
  value: string;
}

type Employee = {
  id: string;
  value: string;
}

const getAllWeeks = (): Week[] => {
  const weeks: Week[] = [];

  const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
  const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  for (let i = 0; i <= 4; i += 1) {
    const monday = subWeeks(startOfThisWeek, i);
    const mondayToString = format(monday, 'dd MMM yyyy');

    const sunday = subWeeks(endOfThisWeek, i);
    const sundayToString = format(sunday, 'dd MMM yyyy');

    weeks.push(
      {
        id: `week${i}`,
        value: `${mondayToString} - ${sundayToString}`,
      },
    );
  }

  return weeks;
};

const getAllEmployees = (): Employee[] => [
  { id: uuidv4(), value: 'Emma Johnson' },
  { id: uuidv4(), value: 'Jacob Williams' },
  { id: uuidv4(), value: 'Sophia Davis' },
];

const allEmployees = getAllEmployees();

const getRandomHours = (maxNumber: number): number => Math.floor(Math.random() * maxNumber);

const getDaysEarnings = (hours: number, hourRate: number, day: string): string => (
  day === 'saturday' || day === 'sunday'
    ? `\u20AC${(hours * hourRate * 2).toFixed(2)}`
    : `\u20AC${(hours * hourRate).toFixed(2)}`
);

export {
  getAllWeeks, allEmployees, getRandomHours, getDaysEarnings,
};
