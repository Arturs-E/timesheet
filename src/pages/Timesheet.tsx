import React, { useState } from 'react';
import './Timesheet.scss';
import { FormControl } from '@mui/material';
import FormSelect from '../components/form/FormSelect';

type FormValues = {
  employee: string;
  week: string;
}

const Timesheet = (): JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({ employee: '', week: '' });

  return (
    <div className="timesheet__selection-container">
      <FormControl className="timesheet__form-wrapper" fullWidth>
        <FormSelect
          label="Employee"
          options={['John Smith', 'Gretel Hansel']}
          value={formValues.employee}
          changeHandler={(employee) => setFormValues({ ...formValues, employee })}
        />
      </FormControl>
      <FormControl className="timesheet__form-wrapper" fullWidth>
        <FormSelect
          label="Week"
          options={['Week1', 'Week2']}
          value={formValues.week}
          changeHandler={(week) => setFormValues({ ...formValues, week })}
        />
      </FormControl>
    </div>
  );
};

export default Timesheet;
