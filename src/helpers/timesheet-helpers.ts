import { TimesheetDataWeeks } from './get-timesheet-data';

const EUR_SYMBOL = '\u20AC';

const getRandomNumberBetweenTwo = (minNumber: number, maxNumber: number): number => (
  Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)
);

const getDaysEarnings = (hours: number, hourRate: number, day: string): number => (
  day === 'saturday' || day === 'sunday'
    ? (hours * hourRate * 2)
    : (hours * hourRate)
);

const getDaysEarningsValue = (hourRate: number | undefined, hoursWorked: number, day: string): string => (
  hourRate ? `${EUR_SYMBOL}${getDaysEarnings(hoursWorked, hourRate, day).toFixed(2)}` : ''
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
): string | undefined => {
  if (hourRate && selectedEmployeesWeek) {
    const weeksSalary = selectedEmployeesWeek.weeklyHours
      .reduce((a, b) => a + getDaysEarnings(b.hoursWorked, hourRate, b.day), 0);
    return `${EUR_SYMBOL}${weeksSalary.toFixed(2)}`;
  }
  return undefined;
};

export {
  getDaysEarnings,
  getDaysEarningsValue,
  getTotalWeeklyHours,
  getTotalWeeklySalary,
  getRandomNumberBetweenTwo,
};
