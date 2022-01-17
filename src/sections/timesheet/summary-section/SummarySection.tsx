import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import { TimesheetDataWeeks } from '../../../data/timesheet-data';
import './SummarySection.scss';

type SummarySectionProps = {
  isPageLoading: boolean;
  totalWeeklyHours: number | undefined;
  totalWeeklySalary: string | undefined;
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
}

const SummarySection:FC<SummarySectionProps> = ({
  isPageLoading,
  totalWeeklyHours,
  totalWeeklySalary,
  selectedEmployeesWeek,
}): JSX.Element => (
  <div className="timesheet__summary-container">
    <table className="timesheet__summary-table">
      <tbody>
        <tr>
          <th>Hours worked</th>
          <td>{totalWeeklyHours}</td>
        </tr>
        <tr>
          <th>Salary</th>
          <td>
            {selectedEmployeesWeek && (isPageLoading
              ? (<CircularProgress color="secondary" size="1rem" />)
              : totalWeeklySalary)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default SummarySection;
