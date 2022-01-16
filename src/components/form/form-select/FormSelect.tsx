import React, { FC } from 'react';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import Person from '@mui/icons-material/Person';

type FormSelectProps = {
  label: string;
  options: { id: string, value: string }[];
  value: string;
  changeHandler: (value: string) => void;
}

const FormSelect:FC<FormSelectProps> = ({
  label, options, value, changeHandler,
}): JSX.Element => (
  <TextField
    id={`${label}-select`}
    select
    label={label}
    placeholder="placeholder"
    value={value}
    onChange={(e) => changeHandler(e.target.value)}
    sx={{
      '& .MuiOutlinedInput-input': { padding: '14px' },
      '& .MuiOutlinedInput-notchedOutline': { border: '2px solid var(--clr-form)' },
    }}
    InputLabelProps={{
      shrink: true,
      style: {
        textTransform: 'capitalize', fontWeight: 'bold', color: 'var(--clr-form)', letterSpacing: '1px',
      },
    }}
    InputProps={{
      style: { color: 'inherit' },
      startAdornment: (
        <InputAdornment position="start">
          <Person />
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
