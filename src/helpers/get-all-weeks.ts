import {
  endOfWeek, format, startOfWeek, subWeeks,
} from 'date-fns';

type Week = {
  id: string;
  value: string;
}
const getAllWeeks = (maxNumber: number): Week[] => {
  const weeks: Week[] = [];
  const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
  const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  for (let i = 0; i < maxNumber; i += 1) {
    const monday = subWeeks(startOfThisWeek, i);
    const mondayToString = format(monday, 'dd MMM yyyy');

    const sunday = subWeeks(endOfThisWeek, i);
    const sundayToString = format(sunday, 'dd MMM yyyy');

    weeks.push(
      { id: `week${i}`, value: `${mondayToString} - ${sundayToString}` },
    );
  }
  return weeks;
};

export default getAllWeeks;
