export function isToday(date: Date): boolean {
  const now = new Date();

  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return true;
  } else {
    return false;
  }
}
