import React, { FC } from 'react';
import { TimesheetDataWeeks } from '../../../data/timesheet-data';
import './SummarySection.scss';

type SummarySectionProps = {
  isLoading: boolean;
  totalWeeklyHours: number | undefined;
  totalWeeklySalary: string | undefined;
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
}

const SummarySection:FC<SummarySectionProps> = ({
  isLoading,
  totalWeeklyHours,
  totalWeeklySalary,
  selectedEmployeesWeek,
}): JSX.Element => (
  <div className="timesheet__summary-container">
    <table className="timesheet__summary-table">
      <tr>
        <th>Hours worked</th>
        <td>{totalWeeklyHours}</td>
      </tr>
      <tr>
        <th>Salary</th>
        <td>{selectedEmployeesWeek && (isLoading ? 'loading' : totalWeeklySalary)}</td>
      </tr>
    </table>
  </div>
);

export default SummarySection;
