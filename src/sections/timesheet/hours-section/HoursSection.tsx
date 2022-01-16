import React, { FC } from 'react';
import FormInput from '../../../components/form/form-input/FormInput';
import { getDaysEarningsValue } from '../../../helpers/timesheet-helpers';
import { TimesheetDataWeeks } from '../../../data/timesheet-data';
import { useAppDispatch } from '../../../redux/store/hooks';
import { updateHours } from '../../../redux/slices/timesheetsSlice';
import { SelectValues } from '../../../pages/Timesheet';
import './HoursSection.scss';

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
                  {isLoading ? 'loading' : getDaysEarningsValue(hourRate, hoursWorked, day)}
                </span>
              </div>
            )))
          : (<h3 style={{ textAlign: 'center' }}>Please choose the employee and week of interest!</h3>)
      }
    </div>
  );
};

export default HoursSection;
