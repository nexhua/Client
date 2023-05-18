import {type Food} from '../interfaces/nutrition/Food';
import {type FoodNutrient} from '../interfaces/nutrition/FoodNutrient';
import {type FoodUnit} from '../interfaces/nutrition/FoodUnit';

export const food: Food = {
  id: 50,
  name: 'Beef steak, battered, fried, NS as to fat eaten',
  description: null,
  imageUrl: null,
  servingSize: 2,
  servingSizeUnitId: 0,
};

export const foodUnits: FoodUnit[] = [
  {
    foodId: 50,
    unitId: 0,
  },
  {
    foodId: 50,
    unitId: 1,
  },
  {
    foodId: 50,
    unitId: 2,
  },
  {
    foodId: 50,
    unitId: 3,
  },
  {
    foodId: 50,
    unitId: 4,
  },
  {
    foodId: 50,
    unitId: 5,
  },
  {
    foodId: 50,
    unitId: 6,
  },
  {
    foodId: 50,
    unitId: 7,
  },
];

export const foodNutrients: FoodNutrient[] = [
  {
    id: 0,
    foodId: 50,
    nutrientId: 0,
    amount: 5,
  },
  {
    id: 1,
    foodId: 50,
    nutrientId: 1,
    amount: 3,
  },
  {
    id: 2,
    foodId: 50,
    nutrientId: 2,
    amount: 15,
  },
  {
    id: 3,
    foodId: 50,
    nutrientId: 3,
    amount: 5,
  },
  {
    id: 4,
    foodId: 50,
    nutrientId: 4,
    amount: 5,
  },
  {
    id: 5,
    foodId: 50,
    nutrientId: 5,
    amount: 5,
  },
  {
    id: 6,
    foodId: 50,
    nutrientId: 6,
    amount: 5,
  },
  {
    id: 7,
    foodId: 50,
    nutrientId: 7,
    amount: 5,
  },
  {
    id: 8,
    foodId: 50,
    nutrientId: 8,
    amount: 5,
  },
  {
    id: 9,
    foodId: 50,
    nutrientId: 9,
    amount: 5,
  },
  {
    id: 8,
    foodId: 50,
    nutrientId: 16,
    amount: 5,
  },
  {
    id: 9,
    foodId: 50,
    nutrientId: 17,
    amount: 5,
  },
];
