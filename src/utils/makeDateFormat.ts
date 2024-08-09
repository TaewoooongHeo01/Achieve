export const makeDateFormat = (
  year: number,
  month: number,
  date: number,
): string => {
  return (
    String(year) +
    String(month).padStart(2, '0') +
    String(date).padStart(2, '0')
  );
};
