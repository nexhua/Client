import {Conversion, Unit} from '../types/tracking/Units';

export function isUnit(value: string): value is Unit {
  return Object.values<string>(Unit).includes(value);
}

export function getType(unit: string): keyof typeof Unit | null {
  if (isUnit(unit)) {
    return Unit[unit];
  }

  return null;
}

export function toGram(amount: number, value: string): number {
  if (isUnit(value) && value !== Unit.kcal && value !== Unit.g) {
    return amount * Math.pow(10, Conversion[value]);
  }
  return amount;
}
