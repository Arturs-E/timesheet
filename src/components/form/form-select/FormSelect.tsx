import React, { FC, ReactElement } from 'react';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import './FormSelect.scss';

type FormSelectProps = {
  label: string;
  options: { id: string, value: string }[];
  value: string;
  changeHandler: (value: string) => void;
  icon?: ReactElement;
}

const FormSelect:FC<FormSelectProps> = ({
  label, options, value, changeHandler, icon,
}): JSX.Element => (
  <TextField
    id={`${label}-select`}
    select
    label={label}
    value={value}
    onChange={(e) => changeHandler(e.target.value)}
    sx={{
      '& .MuiOutlinedInput-input': { padding: '0.8rem' },
      '& .MuiOutlinedInput-notchedOutline': { border: '2px solid var(--clr-primary)' },
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: '2px solid var(--clr-input-hover)' },
    }}
    InputLabelProps={{
      shrink: true,
      style: {
        textTransform: 'capitalize', fontWeight: 'bold', color: 'var(--clr-primary)', letterSpacing: '1px',
      },
    }}
    InputProps={{
      style: { color: 'inherit' },
      startAdornment: (
        <InputAdornment position="start">
          {icon}
        </InputAdornment>
      ),
    }}
  >
    {options.map((item) => (
      <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
    ))}
  </TextField>
);

export default FormSelect;
