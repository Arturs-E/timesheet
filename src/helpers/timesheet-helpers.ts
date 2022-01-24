import { TimesheetDataWeeks } from './get-timesheet-data';

const EUR_SYMBOL = '\u20AC';

const getRandomNumberBetweenTwo = (minNumber: number, maxNumber: number): number => (
  Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)
);

const formatSalary = (salary: number | undefined): string => `${EUR_SYMBOL}${salary?.toFixed(2)}`;

const getDaysSalary = (hours: number, hourRate: number, day: string): number => (
  day === 'saturday' || day === 'sunday'
    ? (hours * hourRate * 2)
    : (hours * hourRate)
);

const getTotalWeeklyHours = (selectedEmployeesWeek: TimesheetDataWeeks | undefined): number | undefined => {
  if (selectedEmployeesWeek) {
    return selectedEmployeesWeek.weeklyHours
      .reduce((a, b) => a + b.hoursWorked, 0);
  }
  return undefined;
};

const getTotalWeeklySalary = (
  hourRate: number | undefined,
  selectedEmployeesWeek: TimesheetDataWeeks | undefined,
): number | undefined => {
  if (hourRate && selectedEmployeesWeek) {
    return selectedEmployeesWeek.weeklyHours
      .reduce((a, b) => a + getDaysSalary(b.hoursWorked, hourRate, b.day), 0);
  }
  return undefined;
};

export {
  getDaysSalary,
  getTotalWeeklyHours,
  getTotalWeeklySalary,
  formatSalary,
  getRandomNumberBetweenTwo,
  EUR_SYMBOL,
};
