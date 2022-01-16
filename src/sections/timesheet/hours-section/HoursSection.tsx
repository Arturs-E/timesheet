import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import FormInput from '../../../components/form/form-input/FormInput';
import { getDaysEarningsValue } from '../../../helpers/timesheet-helpers';
import { TimesheetDataWeeks } from '../../../data/timesheet-data';
import { useAppDispatch } from '../../../redux/store/hooks';
import { updateHours } from '../../../redux/slices/timesheetsSlice';
import { SelectValues } from '../../../pages/Timesheet';
import './HoursSection.scss';
import Heading3 from '../../../components/headings/Heading3';

type HoursSectionProps = {
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
  hourRate: number | undefined;
  isLoading: boolean;
  selectValues: SelectValues;
}

const HoursSection:FC<HoursSectionProps> = ({
  selectedEmployeesWeek,
  hourRate,
  isLoading,
  selectValues,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const onHourChange = (hours: number, day: string): void => {
    dispatch(updateHours({
      nameId: selectValues.employee, weekId: selectValues.week, day, hours,
    }));
  };

  return (
    <div className="timesheet__hours-container">
      {
        selectedEmployeesWeek
          ? (selectedEmployeesWeek
            .weeklyHours.map(({ day, hoursWorked }) => (
              <div key={day} className="timesheet__hours-row">
                <FormInput
                  label={day}
                  value={hoursWorked}
                  changeHandler={(value: string) => onHourChange(+value, day)}
                />
                <span className="timesheet__day-earnings">
                  {isLoading
                    ? (
                      <CircularProgress
                        color="secondary"
                        size="1rem"
                      />
                    )
                    : getDaysEarningsValue(hourRate, hoursWorked, day)}
                </span>
              </div>
            )))
          : (
            <div className="timesheet__hours-heading-wrapper">
              <Heading3>Please choose the employee and week of interest!</Heading3>
            </div>
          )
      }
    </div>
  );
};

export default HoursSection;
