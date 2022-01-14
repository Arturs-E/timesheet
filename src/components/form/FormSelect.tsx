import React, { FC } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';

type FormSelectProps = {
  label: string;
  options: string[];
  value: string;
  changeHandler: (value: string) => void;
}

const FormSelect:FC<FormSelectProps> = ({
  label, options, value, changeHandler,
}): JSX.Element => (
  <>
    <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
    <Select
      labelId={`${label}-select-label`}
      id={`${label}-select`}
      label={label}
      value={value}
      onChange={(e) => changeHandler(e.target.value)}
    >
      {options.map((item) => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </Select>
  </>
);

export default FormSelect;
