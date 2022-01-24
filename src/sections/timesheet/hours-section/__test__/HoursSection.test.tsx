import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { FC } from 'react';
import HoursSection from '../HoursSection';
import { store } from '../../../../redux/store/store';
import { TimesheetDataWeeks } from '../../../../helpers/get-timesheet-data';
import { EUR_SYMBOL } from '../../../../helpers/timesheet-helpers';

type MockComponentProps = {
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
  areSelectFieldsChanged: boolean;
}

const selectValues = {
  employee: '',
  week: '',
};

const hourRate = 10;

const hoursData = {
  weekId: 'week0',
  weekName: 'This week',
  weeklyHours: [
    { day: 'monday', hoursWorked: 8 },
    { day: 'tuesday', hoursWorked: 6 },
    { day: 'wednesday', hoursWorked: 5 },
    { day: 'thursday', hoursWorked: 0 },
    { day: 'friday', hoursWorked: 4 },
    { day: 'saturday', hoursWorked: 1 },
    { day: 'sunday', hoursWorked: 12 },
  ],
};

const MockComponent:FC<MockComponentProps> = ({
  selectedEmployeesWeek,
  areSelectFieldsChanged,
}): JSX.Element => (
  <Provider store={store}>
    <HoursSection
      selectedEmployeesWeek={selectedEmployeesWeek}
      hourRate={hourRate}
      selectValues={selectValues}
      areSelectFieldsChanged={areSelectFieldsChanged}
    />
  </Provider>
);

describe('HoursSection component', () => {
  it('should show info message on initial render', () => {
    render(<MockComponent selectedEmployeesWeek={undefined} areSelectFieldsChanged={false} />);

    const heading = screen.getByRole('heading', { name: /Please choose the employee and week/i });
    expect(heading).toBeVisible();
  });

  it('should not show info message if data is not undefined', () => {
    render(<MockComponent selectedEmployeesWeek={hoursData} areSelectFieldsChanged={false} />);
    const heading = screen.queryByRole('heading', { name: /Please choose the employee and week/i });
    expect(heading).not.toBeInTheDocument();
  });

  it('should render 7 input fields for hour change', () => {
    render(<MockComponent selectedEmployeesWeek={hoursData} areSelectFieldsChanged={false} />);
    const inputElements = screen.getAllByTestId('form-input-test-id');
    expect(inputElements).toHaveLength(7);
  });

  it('should render 7 days salary elements', () => {
    render(<MockComponent selectedEmployeesWeek={hoursData} areSelectFieldsChanged={false} />);
    const salaryElements = screen.getAllByTestId(/days-salary-id-/i);
    expect(salaryElements).toHaveLength(7);
  });

  it('should correctly calculate a days salary', () => {
    render(<MockComponent selectedEmployeesWeek={hoursData} areSelectFieldsChanged={false} />);
    const mondaysInputElement: HTMLInputElement = screen.getByDisplayValue(`${hoursData.weeklyHours[0].hoursWorked}`);
    const mondaysSalary: HTMLSpanElement = screen.getByTestId(/days-salary-id-0/i);

    const daysSalary = `${EUR_SYMBOL}${(+mondaysInputElement.value * hourRate).toFixed(2)}`;
    expect(mondaysSalary).toHaveTextContent(daysSalary);
  });

  it('should not show days salary if fields have changed', () => {
    render(<MockComponent selectedEmployeesWeek={hoursData} areSelectFieldsChanged />);
    const mondaysInputElement: HTMLInputElement = screen.getByDisplayValue(`${hoursData.weeklyHours[0].hoursWorked}`);
    const mondaysSalary: HTMLSpanElement = screen.getByTestId(/days-salary-id-0/i);

    const daysSalary = `${EUR_SYMBOL}${(+mondaysInputElement.value * hourRate).toFixed(2)}`;
    expect(mondaysSalary).not.toHaveTextContent(daysSalary);
  });
});
