import React, { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import FormInput from '../../../components/form/form-input/FormInput';
import { formatSalary, getDaysSalary } from '../../../helpers/timesheet-helpers';
import { daysUpdateState, DaysUpdateState } from '../../../data/timesheet-data';
import { useAppDispatch } from '../../../redux/store/hooks';
import { updateHours } from '../../../redux/slices/timesheetsSlice';
import { SelectValues } from '../../../pages/Timesheet';
import './HoursSection.scss';
import Heading3 from '../../../components/headings/Heading3';
import { TimesheetDataWeeks } from '../../../helpers/get-timesheet-data';

type HoursSectionProps = {
  selectedEmployeesWeek: TimesheetDataWeeks | undefined;
  hourRate: number | undefined;
  selectValues: SelectValues;
  areSelectFieldsChanged: boolean;
}

const HoursSection:FC<HoursSectionProps> = ({
  selectedEmployeesWeek,
  hourRate,
  selectValues,
  areSelectFieldsChanged,
}): JSX.Element => {
  const [daysUpdate, setDaysUpdate] = useState<DaysUpdateState>(daysUpdateState);

  useEffect(() => {
    const timeout = setTimeout(() => setDaysUpdate(daysUpdateState), 500);
    return () => clearTimeout(timeout);
  }, [daysUpdate]);

  const dispatch = useAppDispatch();
  const onHourChange = (hours: number, day: string): void => {
    dispatch(updateHours({
      nameId: selectValues.employee, weekId: selectValues.week, day, hours,
    }));

    const updatedDays = { ...daysUpdate };
    updatedDays[day] = true;
    setDaysUpdate(updatedDays);
  };

  const getValueForDaysSalary = (hoursWorked: number, day: string): JSX.Element | string => {
    if (daysUpdate[day] || areSelectFieldsChanged) {
      return (<CircularProgress color="secondary" size="1rem" />);
    }
    if (hourRate) {
      return formatSalary(getDaysSalary(hoursWorked, hourRate, day));
    }
    return '';
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
                  {getValueForDaysSalary(hoursWorked, day)}
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
