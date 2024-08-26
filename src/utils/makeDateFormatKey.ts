export const makeDateFormatKey = (
  year: number,
  month: number,
  date: number,
): string => {
  const d = new Date(year, month - 1, date);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const dt = d.getDate();
  return String(y) + String(m).padStart(2, '0') + String(dt).padStart(2, '0');
};
