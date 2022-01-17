import {
  startOfWeek, endOfWeek, subWeeks, format,
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Fakerator from 'fakerator';

type Week = {
  id: string;
  value: string;
}

type Employee = {
  id: string;
  value: string;
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

export {
  getAllWeeks,
  getAllEmployees,
  getRandomHours,
  getRandomHourRate,
};
