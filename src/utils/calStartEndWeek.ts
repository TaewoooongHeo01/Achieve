export const calculateStartAndEndDayOfMonth = (
  year: number,
  month: number,
): number[] => {
  const startDayOfMonth = new Date(year, month - 1, 1).getDay();
  const startDayOfNextMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();

  let startWeekDateOfMonth = lastDayOfPrevMonth - startDayOfMonth + 1;
  let lastWeekDateOfMonth = lastDayOfMonth - startDayOfNextMonth + 1;
  startWeekDateOfMonth = startDayOfMonth == 0 ? 1 : startWeekDateOfMonth;
  lastWeekDateOfMonth =
    startDayOfNextMonth == 0 ? lastDayOfMonth - 6 : lastWeekDateOfMonth;
  return [
    startWeekDateOfMonth,
    lastWeekDateOfMonth,
    lastDayOfMonth,
    lastDayOfPrevMonth,
  ];
};
