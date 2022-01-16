import React, { FC } from 'react';
import { FormControl } from '@mui/material';
import FormSelect from '../../../components/form/form-select/FormSelect';
import { allEmployees, allWeeks } from '../../../helpers/data-helpers';
import { SelectValues } from '../../../pages/Timesheet';
import './SelectionSection.scss';

type SelectionSectionProps = {
  selectValues: SelectValues;
  onEmployeeChange: (value: string) => void;
  onWeekChange: (value: string) => void;
}

const SelectionSection:FC<SelectionSectionProps> = ({
  selectValues,
  onEmployeeChange,
  onWeekChange,
}): JSX.Element => (
  <div className="timesheet__selection-container">
    <FormControl fullWidth>
      <FormSelect
        label="Employee"
        options={allEmployees}
        value={selectValues.employee}
        changeHandler={onEmployeeChange}
      />
    </FormControl>
    <FormControl fullWidth>
      <FormSelect
        label="Week"
        options={allWeeks}
        value={selectValues.week}
        changeHandler={onWeekChange}
      />
    </FormControl>
  </div>
);

export default SelectionSection;
