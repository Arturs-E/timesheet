import getAllWeeks from '../helpers/get-all-weeks';
import getAllEmployees from '../helpers/get-all-employees';

type DaysUpdateState = {
  [key: string]: boolean;
}

const NUMBER_OF_EMPLOYEES = 5;
const NUMBER_OF_WEEKS = 5;

const allWeeks = getAllWeeks(NUMBER_OF_WEEKS);
const allEmployees = getAllEmployees(NUMBER_OF_EMPLOYEES);

const daysUpdateState: DaysUpdateState = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export {
  allEmployees,
  allWeeks,
  daysUpdateState,
  NUMBER_OF_WEEKS,
  NUMBER_OF_EMPLOYEES,
};
export type { DaysUpdateState };
