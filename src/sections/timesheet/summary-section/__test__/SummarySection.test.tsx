import { render, screen } from '@testing-library/react';
import SummarySection from '../SummarySection';
import { EUR_SYMBOL } from '../../../../helpers/timesheet-helpers';

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

describe('SummarySection component', () => {
  it('should show Hours worked text', () => {
    render(<SummarySection
      areSelectFieldsChanged={false}
      areHoursUpdated={false}
      totalWeeklyHours={undefined}
      totalWeeklySalary={undefined}
      selectedEmployeesWeek={undefined}
    />);

    const hoursHeadingElement: HTMLTableHeaderCellElement = screen.getByText(/hours worked/i);
    expect(hoursHeadingElement).toBeVisible();
  });

  it('should show Salary text', () => {
    render(<SummarySection
      areSelectFieldsChanged={false}
      areHoursUpdated={false}
      totalWeeklyHours={undefined}
      totalWeeklySalary={undefined}
      selectedEmployeesWeek={undefined}
    />);

    const salaryHeadingElement: HTMLTableHeaderCellElement = screen.getByText(/salary/i);
    expect(salaryHeadingElement).toBeVisible();
  });

  it('should not show weekly hours if data is undefined', () => {
    render(<SummarySection
      areSelectFieldsChanged={false}
      areHoursUpdated={false}
      totalWeeklyHours={undefined}
      totalWeeklySalary={undefined}
      selectedEmployeesWeek={undefined}
    />);

    const hoursElement: HTMLTableDataCellElement = screen.getByTestId('weekly-hours');
    expect(hoursElement).toHaveTextContent('');
  });

  it('should not show weekly salary if data is undefined', () => {
    render(<SummarySection
      areSelectFieldsChanged={false}
      areHoursUpdated={false}
      totalWeeklyHours={undefined}
      totalWeeklySalary={undefined}
      selectedEmployeesWeek={undefined}
    />);

    const salaryElement: HTMLTableDataCellElement = screen.getByTestId('weekly-salary');
    expect(salaryElement).toHaveTextContent('');
  });

  it('should show weekly hours if data is available', () => {
    render(<SummarySection
      areSelectFieldsChanged={false}
      areHoursUpdated={false}
      totalWeeklyHours={40}
      totalWeeklySalary={undefined}
      selectedEmployeesWeek={undefined}
    />);

    const hoursElement: HTMLTableDataCellElement = screen.getByTestId('weekly-hours');
    expect(hoursElement).toHaveTextContent('40');
  });

  it('should show weekly salary if data is available', () => {
    render(<SummarySection
      areSelectFieldsChanged={false}
      areHoursUpdated={false}
      totalWeeklyHours={undefined}
      totalWeeklySalary={`${EUR_SYMBOL}400.00`}
      selectedEmployeesWeek={hoursData}
    />);

    const salaryElement: HTMLTableDataCellElement = screen.getByTestId('weekly-salary');
    expect(salaryElement).toHaveTextContent(`${EUR_SYMBOL}400.00`);
  });
});
