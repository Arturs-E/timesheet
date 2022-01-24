import getAllEmployees from '../get-all-employees';
import getAllWeeks from '../get-all-weeks';
import {
  formatSalary,
  getDaysSalary,
  getRandomNumberBetweenTwo,
  getTotalWeeklyHours,
  getTotalWeeklySalary,
} from '../timesheet-helpers';
import { getTimesheetData } from '../get-timesheet-data';
import { NUMBER_OF_EMPLOYEES, NUMBER_OF_WEEKS } from '../../data/timesheet-data';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}

const weekData = {
  weekId: 'testWeek',
  weekName: 'testWeek',
  weeklyHours: [
    { day: 'monday', hoursWorked: 8 },
    { day: 'tuesday', hoursWorked: 7 },
    { day: 'wednesday', hoursWorked: 0 },
    { day: 'thursday', hoursWorked: 6 },
    { day: 'friday', hoursWorked: 12 },
    { day: 'saturday', hoursWorked: 10 },
    { day: 'sunday', hoursWorked: 4 },
  ],
};

describe('Helper functions', () => {
  describe('Get all employees function', () => {
    it(`should have array length of ${NUMBER_OF_EMPLOYEES}`, () => {
      const employees = getAllEmployees(NUMBER_OF_EMPLOYEES);
      expect(employees).toHaveLength(NUMBER_OF_EMPLOYEES);
    });
  });

  describe('Get all weeks function', () => {
    const weeks = getAllWeeks(NUMBER_OF_WEEKS);
    it(`should have array length of ${NUMBER_OF_WEEKS}`, () => {
      expect(weeks).toHaveLength(NUMBER_OF_WEEKS);
    });
    it('array should have an object with id and value keys', () => {
      expect(weeks[0]).toEqual(expect.objectContaining({
        id: expect.any(String),
        value: expect.any(String),
      }));
    });
  });

  describe('Get random number between two function', () => {
    expect.extend({
      toBeWithinRange(received, minimum, maximum) {
        if (received >= minimum && received <= maximum) {
          return {
            message: () => `received ${received}, passes expectation to be within range ${minimum} - ${maximum}`,
            pass: true,
          };
        }
        return {
          message: () => `received ${received}, expected to be within range ${minimum} - ${maximum}`,
          pass: false,
        };
      },
    });

    it('should be between maximum and minimum values', () => {
      const number = getRandomNumberBetweenTwo(0, 13);
      expect(number).toBeWithinRange(0, 12);
    });
  });

  describe('Format salary function', () => {
    it('should return formatted string with EUR sign and double decimals', () => {
      const salary = formatSalary(50);
      expect(salary).toBe('\u20AC50.00');
    });
  });

  describe('Get days salary function', () => {
    const hours = 10;
    const hourRate = 5;
    const weekdayEarnings = getDaysSalary(hours, hourRate, 'monday');

    it('should return double if day is saturday', () => {
      expect(getDaysSalary(hours, hourRate, 'saturday')).toBe(2 * weekdayEarnings);
    });
    it('should return double if day is sunday', () => {
      expect(getDaysSalary(hours, hourRate, 'sunday')).toBe(2 * weekdayEarnings);
    });
  });

  describe('Get total weekly hours function', () => {
    it('should return the correct total weekly hours', () => {
      expect(getTotalWeeklyHours(weekData)).toBe(47);
    });
    it('should return undefined if argument is undefined', () => {
      expect(getTotalWeeklyHours(undefined)).toBe(undefined);
    });
  });

  describe('Get total weekly salary function', () => {
    it('should return the correct total weekly salaries', () => {
      expect(getTotalWeeklySalary(10, weekData)).toBe(610);
    });
    it('should return undefined if argument is undefined', () => {
      expect(getTotalWeeklySalary(10, undefined)).toBe(undefined);
    });
  });

  describe('Get timesheet data function', () => {
    it(`should return an array of length ${NUMBER_OF_EMPLOYEES}`, () => {
      expect(getTimesheetData()).toHaveLength(NUMBER_OF_EMPLOYEES);
    });
  });
});
