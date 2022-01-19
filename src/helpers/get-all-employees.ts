import Fakerator from 'fakerator';
import { v4 as uuidv4 } from 'uuid';

type Employee = {
  id: string;
  value: string;
}

const fakerator = Fakerator();

const getAllEmployees = (maxNumber: number): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 0; i < maxNumber; i += 1) {
    employees.push({ id: uuidv4(), value: fakerator.names.name() });
  }
  return employees;
};

export default getAllEmployees;
