import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import './SummarySection.scss';
import { TimesheetDataWeeks } from '../../../helpers/data-helpers';

type SummarySectionProps = {
  areSelectFieldsChanged: boolean;
  areHoursUpdated: boolean;
  totalWeeklyHours: number | undefined;
  totalWeeklySalary: string | undefined;
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
}

const SummarySection:FC<SummarySectionProps> = ({
  areSelectFieldsChanged,
  totalWeeklyHours,
  totalWeeklySalary,
  selectedEmployeesWeek,
  areHoursUpdated,
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
            {selectedEmployeesWeek && (areSelectFieldsChanged || areHoursUpdated
              ? (<CircularProgress color="secondary" size="1rem" />)
              : totalWeeklySalary)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default SummarySection;
