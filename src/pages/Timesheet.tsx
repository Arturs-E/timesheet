import React, { useEffect, useRef, useState } from 'react';
import './Timesheet.scss';
import { FormControl } from '@mui/material';
import FormSelect from '../components/form/form-select/FormSelect';
import { allEmployees, getAllWeeks, getDaysEarnings } from '../helpers/helpers';
import FormInput from '../components/form/form-input/FormInput';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { updateHours } from '../redux/slices/timesheetsSlice';

type FormValues = {
  employee: string;
  week: string
}

const Timesheet = (): JSX.Element => {
  const [selectValues, setSelectValues] = useState<FormValues>({ employee: '', week: '' });
  const [isLoading, setIsLoading] = useState(false);
  const initialRender = useRef(true);

  const weeklyHours = useAppSelector((state) => state.timesheet
    .find((item) => item.nameId === selectValues.employee))
    ?.hours.find((item) => item.weekId === selectValues.week);
  const hourRate = useAppSelector((state) => state.timesheet
    .find((item) => item.nameId === selectValues.employee)?.hourRate);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return undefined;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return undefined;
  }, [selectValues, weeklyHours]);

  const dispatch = useAppDispatch();

  const onHourChange = (hours: number, day: string): void => {
    dispatch(updateHours({
      nameId: selectValues.employee, weekId: selectValues.week, day, hours,
    }));
  };

  const getDaysEarningsValue = (hoursWorked: number, day: string): string => (
    hourRate ? `\u20AC${getDaysEarnings(hoursWorked, hourRate, day).toFixed(2)}` : ''
  );

  const getTotalWeeklyHours = (): number | undefined => {
    if (weeklyHours) {
      return weeklyHours.weeklyHours
        .reduce((a, b) => a + b.hoursWorked, 0);
    }
    return undefined;
  };

  const getTotalWeeklySalary = (): number | undefined => {
    if (hourRate && weeklyHours) {
      return weeklyHours.weeklyHours
        .reduce((a, b) => a + getDaysEarnings(b.hoursWorked, hourRate, b.day), 0);
    }
    return undefined;
  };

  return (
    <div className="timesheet">
      <div className="timesheet__selection-container">
        <FormControl fullWidth>
          <FormSelect
            label="Employee"
            options={allEmployees}
            value={selectValues.employee}
            changeHandler={(employee) => setSelectValues({ ...selectValues, employee })}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormSelect
            label="Week"
            options={getAllWeeks()}
            value={selectValues.week}
            changeHandler={(week) => setSelectValues({ ...selectValues, week })}
          />
        </FormControl>
      </div>
      <div className="timesheet__hours-container">
        {
          weeklyHours
            ? (weeklyHours
              .weeklyHours.map(({ day, hoursWorked }) => (
                <div key={day} className="timesheet__hours-row">
                  <FormInput
                    label={day}
                    value={hoursWorked}
                    changeHandler={(value: string) => onHourChange(+value, day)}
                  />
                  <span className="timesheet__day-earnings">
                    {isLoading ? 'loading' : getDaysEarningsValue(hoursWorked, day)}
                  </span>
                </div>
              )))
            : (<h3 style={{ textAlign: 'center' }}>Please choose the employee and week of interest!</h3>)
        }
      </div>
      <div className="timesheet__summary-container">
        <div className="timesheet__summary-hours-container">
          {weeklyHours && `Hours worked: ${getTotalWeeklyHours()}`}
        </div>
        <div className="timesheet__summary__salary-container">
          {isLoading ? 'loading' : `Salary: \u20AC${getTotalWeeklySalary()?.toFixed(2)}`}
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
