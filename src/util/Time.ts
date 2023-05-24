import i18n from '../localization/_i18n';

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

export function isSameDay(date: Date, refDate: Date): boolean {
  if (
    date.getFullYear() === refDate.getFullYear() &&
    date.getMonth() === refDate.getMonth() &&
    date.getDate() === refDate.getDate()
  ) {
    return true;
  } else {
    return false;
  }
}

export function toDateTimeString(date: Date): string {
  return `${i18n.t(getMonth(date.getMonth()))} ${date.getDate()}, ${i18n.t(
    getDay(date.getDay()),
  )} - ${date.getHours()}:${fillTwo(date.getMinutes())}`;
}

export function toDateString(date: Date): string {
  return `${i18n.t(getMonth(date.getMonth()))} ${date.getDate()}, ${i18n.t(
    getDay(date.getDay()),
  )}`;
}

export function toTimeString(date: Date): string {
  return `${date.getHours()}:${fillTwo(date.getMinutes())}`;
}

export function hourToString(hour: number, minute: number): string {
  return `${hour}:${fillTwo(minute)}`;
}

export function fillTwo(num: number): string {
  if (num.toString().length === 1) {
    return '0'.concat(num.toString());
  } else {
    return num.toString();
  }
}

export function getDay(weekday: number): string {
  switch (weekday) {
    case 0:
      return 'sunday';
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    default:
      return 'monday';
  }
}

export function getMonth(month: number): string {
  switch (month) {
    case 0:
      return 'january';
    case 1:
      return 'february';
    case 2:
      return 'march';
    case 3:
      return 'april';
    case 4:
      return 'may';
    case 5:
      return 'june';
    case 6:
      return 'july';
    case 7:
      return 'august';
    case 8:
      return 'september';
    case 9:
      return 'october';
    case 10:
      return 'november';
    case 11:
      return 'december';
    default:
      return 'january';
  }
}

export function range(start: number, end: number): number[] {
  const numbers = [];

  for (let i = start; i < end; i++) {
    numbers.push(i);
  }
  return numbers;
}
