import React, { useEffect, useState } from 'react';
import './Timesheet.scss';
import { useAppSelector } from '../redux/store/hooks';
import SummarySection from '../sections/timesheet/summary-section/SummarySection';
import { getTotalWeeklyHours, getTotalWeeklySalary } from '../helpers/timesheet-helpers';
import SelectionSection from '../sections/timesheet/selection-section/SelectionSection';
import HoursSection from '../sections/timesheet/hours-section/HoursSection';

type SelectValues = {
  employee: string;
  week: string
}

const Timesheet = (): JSX.Element => {
  const [selectValues, setSelectValues] = useState<SelectValues>({ employee: '', week: '' });
  const [areSelectFieldsChanged, setAreSelectFieldsChanged] = useState(false);
  const [areHoursUpdated, setAreHoursUpdated] = useState(false);

  const selectedEmployeesWeek = useAppSelector((state) => state.timesheet
    .find((item) => item.nameId === selectValues.employee))
    ?.hours.find((item) => item.weekId === selectValues.week);

  const hourRate = useAppSelector((state) => state.timesheet
    .find((item) => item.nameId === selectValues.employee))?.hourRate;

  useEffect(() => {
    setAreSelectFieldsChanged(true);
    const timeout = setTimeout(() => setAreSelectFieldsChanged(false), 500);
    return () => clearTimeout(timeout);
  }, [selectValues]);

  useEffect(() => {
    setAreHoursUpdated(true);
    const timeout = setTimeout(() => setAreHoursUpdated(false), 500);
    return () => clearTimeout(timeout);
  }, [selectedEmployeesWeek]);

  return (
    <div className="timesheet">
      <SelectionSection
        selectValues={selectValues}
        onEmployeeChange={(employee) => setSelectValues({ ...selectValues, employee })}
        onWeekChange={(week) => setSelectValues({ ...selectValues, week })}
      />
      <HoursSection
        selectedEmployeesWeek={selectedEmployeesWeek}
        hourRate={hourRate}
        selectValues={selectValues}
        areSelectFieldsChanged={areSelectFieldsChanged}
      />
      <SummarySection
        areSelectFieldsChanged={areSelectFieldsChanged}
        areHoursUpdated={areHoursUpdated}
        totalWeeklyHours={getTotalWeeklyHours(selectedEmployeesWeek)}
        totalWeeklySalary={getTotalWeeklySalary(hourRate, selectedEmployeesWeek)}
        selectedEmployeesWeek={selectedEmployeesWeek}
      />
    </div>
  );
};

export default Timesheet;
export type { SelectValues };
