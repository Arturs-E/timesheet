import React, { useState } from 'react';
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

  const dispatch = useAppDispatch();
  const weeklyHours = useAppSelector((state) => state.timesheets
    .find((item) => item.nameId === selectValues.employee))
    ?.hours.find((item) => item.weekId === selectValues.week);
  const hourRate = useAppSelector((state) => state.timesheets
    .find((item) => item.nameId === selectValues.employee)?.hourRate);

  const onHourChange = (hours: number, day: string): void => {
    dispatch(updateHours({
      nameId: selectValues.employee, weekId: selectValues.week, day, hours,
    }));
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
                    {hourRate ? getDaysEarnings(hoursWorked, hourRate, day) : ''}
                  </span>
                </div>
              )))
            : (<h3 style={{ textAlign: 'center' }}>Please choose the employee and week of interest!</h3>)
}
      </div>
      <div className="timesheet__summary-container">
        Total
      </div>
    </div>
  );
};

export default Timesheet;
