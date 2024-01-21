export const getMonthBefore = (date?: Date, monthCount?: number): Date => {
  if (!date) {
    date = new Date();
  }
  if (!monthCount && monthCount !== 0) {
    monthCount = 1;
  }
  return new Date(date.getFullYear(), date.getMonth() - monthCount, 1);
}