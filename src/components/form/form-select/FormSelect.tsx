import React, { FC } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';

type FormSelectProps = {
  label: string;
  options: { id: string, value: string }[];
  value: string;
  changeHandler: (value: string) => void;
}

const FormSelect:FC<FormSelectProps> = ({
  label, options, value, changeHandler,
}): JSX.Element => (
  <>
    <InputLabel
      id={`${label}-select-label`}
      style={{ color: 'var(--clr-form)', fontWeight: 'bold', letterSpacing: '1px' }}
    >
      {label}
    </InputLabel>
    <Select
      variant="outlined"
      labelId={`${label}-select-label`}
      id={`${label}-select`}
      label={label}
      value={value}
      onChange={(e) => changeHandler(e.target.value)}
      inputProps={{ style: { fontWeight: '500', color: 'inherit' } }}
    >
      {options.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
      ))}
    </Select>
  </>
);

export default FormSelect;
