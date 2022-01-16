import React, { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import FormInput from '../../../components/form/form-input/FormInput';
import { getDaysEarningsValue } from '../../../helpers/timesheet-helpers';
import { TimesheetDataWeeks } from '../../../data/timesheet-data';
import { useAppDispatch } from '../../../redux/store/hooks';
import { changeLoadingState, updateHours } from '../../../redux/slices/timesheetsSlice';
import { SelectValues } from '../../../pages/Timesheet';
import './HoursSection.scss';
import Heading3 from '../../../components/headings/Heading3';

type HoursSectionProps = {
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
  hourRate: number | undefined;
  selectValues: SelectValues;
  updatingHours: () => void;
}

const HoursSection:FC<HoursSectionProps> = ({
  selectedEmployeesWeek,
  hourRate,
  selectValues,
  updatingHours,
}): JSX.Element => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);
    setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
  }, [selectValues]);

  const dispatch = useAppDispatch();
  const onHourChange = (hours: number, day: string): void => {
    dispatch(updateHours({
      nameId: selectValues.employee, weekId: selectValues.week, day, hours,
    }));
    updatingHours();

    setTimeout(() => {
      dispatch(changeLoadingState({
        nameId: selectValues.employee, weekId: selectValues.week, day, hours,
      }));
    }, 500);
  };

  const getDaysSalary = (isLoading: boolean, hoursWorked: number, day: string): JSX.Element | string => (isLoading
    ? (<CircularProgress color="secondary" size="1rem" />)
    : getDaysEarningsValue(hourRate, hoursWorked, day));

  return (
    <div className="timesheet__hours-container">
      {
        selectedEmployeesWeek
          ? (selectedEmployeesWeek
            .weeklyHours.map(({ day, hoursWorked, isLoading }) => (
              <div key={day} className="timesheet__hours-row">
                <FormInput
                  label={day}
                  value={hoursWorked}
                  changeHandler={(value: string) => onHourChange(+value, day)}
                />
                <span className="timesheet__day-earnings">
                  {isPageLoading
                    ? (<CircularProgress color="secondary" size="1rem" />)
                    : getDaysSalary(isLoading, hoursWorked, day)}
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
