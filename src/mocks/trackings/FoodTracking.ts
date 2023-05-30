import {
  type FoodTrackingNutrient,
  type FoodTracking,
} from '../../interfaces/health/trackings/FoodTracking';

export const foodTrackings: FoodTracking[] = [
  {
    id: 0,
    foodId: 50,
    personId: 15,
    computedUnitId: 'g',
    computedValue: 5,
    createdAt: new Date(),
    date: new Date(),
    foodName: 'Beef',
    meal: 'dinner',
    unitId: 8,
    value: 6,
  },
  {
    id: 1,
    foodId: 50,
    personId: 15,
    computedUnitId: 'g',
    computedValue: 1,
    createdAt: new Date(),
    date: new Date(),
    foodName: 'Beef',
    meal: 'lunch',
    unitId: 8,
    value: 5,
  },
];

export const foodTrackingNutrients: FoodTrackingNutrient[] = [
  {
    id: 0,
    nutrientId: 0,
    trackingId: 0,
    amount: 5,
  },
  {
    id: 1,
    nutrientId: 1,
    trackingId: 0,
    amount: 2,
  },
  {
    id: 2,
    nutrientId: 2,
    trackingId: 0,
    amount: 5,
  },
  {
    id: 3,
    nutrientId: 3,
    trackingId: 0,
    amount: 300,
  },
  {
    id: 4,
    nutrientId: 4,
    trackingId: 0,
    amount: 5,
  },
  {
    id: 5,
    nutrientId: 5,
    trackingId: 0,
    amount: 5,
  },
  {
    id: 6,
    nutrientId: 6,
    trackingId: 0,
    amount: 5,
  },
  {
    id: 7,
    nutrientId: 0,
    trackingId: 1,
    amount: 5,
  },
  {
    id: 8,
    nutrientId: 1,
    trackingId: 1,
    amount: 20,
  },
  {
    id: 9,
    nutrientId: 2,
    trackingId: 1,
    amount: 5,
  },
  {
    id: 10,
    nutrientId: 3,
    trackingId: 1,
    amount: 100,
  },
  {
    id: 11,
    nutrientId: 4,
    trackingId: 1,
    amount: 5,
  },
  {
    id: 12,
    nutrientId: 5,
    trackingId: 1,
    amount: 5,
  },
  {
    id: 13,
    nutrientId: 6,
    trackingId: 1,
    amount: 5,
  },
];
