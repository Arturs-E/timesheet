import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../FormInput';

const labelText = 'Test label';
const MockComponent = ():JSX.Element => {
  const [inputValue, setInputValue] = useState(0);
  return (<FormInput label={labelText} value={inputValue} changeHandler={(value) => setInputValue(+value)} />);
};

describe('FormInput component', () => {
  it('label element should be visible', () => {
    render(<MockComponent />);
    const [label] = screen.getAllByText(labelText);
    expect(label).toBeVisible();
  });

  it('should be able to enter numbers in input field', () => {
    render(<MockComponent />);
    const inputElement: HTMLInputElement = screen.getByDisplayValue(0);

    fireEvent.change(inputElement, { target: { value: 10 } });
    expect(inputElement.value).toBe('10');
  });

  it('should not be able to enter alphabetic characters', () => {
    render(<MockComponent />);
    const inputElement: HTMLInputElement = screen.getByDisplayValue(0);

    fireEvent.change(inputElement, { target: { value: 'abc' } });
    expect(inputElement.value).not.toBe('abc');
  });
});
