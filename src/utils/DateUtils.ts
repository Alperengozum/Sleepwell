export const getMonthBefore = (date?: Date, monthCount?: number): Date => {
  if (!date) {
    date = new Date();
  }
  if (!monthCount && monthCount !== 0) {
    monthCount = 1;
  }
  return new Date(date.getFullYear(), date.getMonth() - monthCount, 1);
}

export const formatHour = (hours: string, is24Hour: undefined | boolean): string => {
  if (is24Hour) {
    return hours;
  } else {
    let formattedHours = parseInt(hours) % 12;
    formattedHours = formattedHours ? formattedHours : 12;
    if (formattedHours < 10) {
      return "0" + formattedHours.toString();
    }
    return formattedHours.toString();
  }
}

export const addHours = (date: Date, hours: number): Date => {
  return new Date(date.getTime() + hours * 3600000);
}