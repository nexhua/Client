enum Unit {
  g = 'g',
  mg = 'mg',
  kcal = 'kcal',
  μg = 'μg',
}

enum Conversion {
  g = 1,
  mg = -3,
  μg = -6,
}

interface Measurement {
  amount: number;
  unit: Unit;
}

export {Unit, Conversion};
export type {Measurement};
