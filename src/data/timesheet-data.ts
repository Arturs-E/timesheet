import { getAllEmployees, getAllWeeks } from '../helpers/data-helpers';

type DaysUpdateState = {
  [key: string]: boolean;
}

const allWeeks = getAllWeeks(5);
const allEmployees = getAllEmployees(5);

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
  allEmployees, allWeeks, daysUpdateState,
};
export type { DaysUpdateState };
