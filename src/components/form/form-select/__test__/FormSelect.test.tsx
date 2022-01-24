import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import FormSelect from '../FormSelect';

const labelText = 'Test label';
const options = [
  { id: '1', value: 'First option' },
  { id: '2', value: 'Second option' },
  { id: '3', value: 'Third option' },
];

const MockComponent = (): JSX.Element => {
  const [selectValue, setSelectValue] = useState('');
  return (
    <FormSelect label={labelText} options={options} value={selectValue} changeHandler={setSelectValue} />
  );
};

describe('FormSelect component', () => {
  it('label element should be visible', () => {
    render(<MockComponent />);
    const [label] = screen.getAllByText(labelText);
    expect(label).toBeVisible();
  });

  it('should render the select element', () => {
    render(<MockComponent />);
    const selectElement: HTMLDivElement = screen.getByRole('button');
    expect(selectElement).toBeInTheDocument();
  });

  it('should show all select options when select is clicked', () => {
    render(<MockComponent />);
    const selectElement: HTMLDivElement = screen.getByRole('button');
    fireEvent.mouseDown(selectElement);

    const selectOptions: HTMLLIElement[] = screen.getAllByRole('option');
    expect(selectOptions).toHaveLength(3);
  });

  it('should be able to select an option', () => {
    render(<MockComponent />);
    const inputElement: HTMLInputElement = screen.getByDisplayValue('');
    const selectElement: HTMLDivElement = screen.getByRole('button');
    fireEvent.mouseDown(selectElement);

    const firstOption: HTMLLIElement = screen.getByText('First option');
    fireEvent.click(firstOption);
    expect(inputElement.value).toBe('1');
  });
});
