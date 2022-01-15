import React, { FC } from 'react';
import { TextField } from '@mui/material';

type FormInputProps = {
  label: string;
  value: number;
  changeHandler: (value: string) => void;
}

const FormInput:FC<FormInputProps> = ({ label, value, changeHandler }) => (
  <TextField
    id={`${label}-input`}
    label={label}
    type="number"
    value={value}
    onChange={(e) => changeHandler(e.target.value)}
    InputLabelProps={{
      shrink: true,
      style: {
        textTransform: 'capitalize', fontWeight: 'bold', color: 'var(--clr-form)', letterSpacing: '1px',
      },
    }}
    inputProps={{ style: { textAlign: 'center', color: 'inherit' } }}
    sx={{ maxWidth: 120 }}
  />
);

export default FormInput;
