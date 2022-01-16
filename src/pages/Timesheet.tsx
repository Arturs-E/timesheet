import React, { useEffect, useState } from 'react';
import './Timesheet.scss';
import FormInput from '../components/form/form-input/FormInput';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { updateHours } from '../redux/slices/timesheetsSlice';
import SummarySection from '../sections/timesheet/summary-section/SummarySection';
import { getDaysEarningsValue, getTotalWeeklyHours, getTotalWeeklySalary } from '../helpers/timesheet-helpers';
import SelectionSection from '../sections/timesheet/selection-section/SelectionSection';

type SelectValues = {
  employee: string;
  week: string
}

const Timesheet = (): JSX.Element => {
  const [selectValues, setSelectValues] = useState<SelectValues>({ employee: '', week: '' });
  const [isLoading, setIsLoading] = useState(false);

  const selectedEmployeesWeek = useAppSelector((state) => state.timesheet
    .find((item) => item.nameId === selectValues.employee))
    ?.hours.find((item) => item.weekId === selectValues.week);

  const hourRate = useAppSelector((state) => state.timesheet
    .find((item) => item.nameId === selectValues.employee))?.hourRate;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [selectValues, selectedEmployeesWeek]);

  const dispatch = useAppDispatch();

  const onHourChange = (hours: number, day: string): void => {
    dispatch(updateHours({
      nameId: selectValues.employee, weekId: selectValues.week, day, hours,
    }));
  };

  return (
    <div className="timesheet">
      <SelectionSection
        selectValues={selectValues}
        onEmployeeChange={(employee) => setSelectValues({ ...selectValues, employee })}
        onWeekChange={(week) => setSelectValues({ ...selectValues, week })}
      />
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
      <SummarySection
        isLoading={isLoading}
        totalWeeklyHours={getTotalWeeklyHours(selectedEmployeesWeek)}
        totalWeeklySalary={getTotalWeeklySalary(hourRate, selectedEmployeesWeek)}
        selectedEmployeesWeek={selectedEmployeesWeek}
      />
    </div>
  );
};

export default Timesheet;
export type { SelectValues };
