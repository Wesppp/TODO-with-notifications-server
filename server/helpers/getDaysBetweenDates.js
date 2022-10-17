exports.getDaysBetweenDates = (startDate, endDate) => {
  const date1 = new Date(startDate)
  const date2 = new Date(endDate)

  const day = 1000 * 60 * 60 * 24;

  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / day);

  if (diffInDays <= 0) { return null }

  return diffInDays;
}