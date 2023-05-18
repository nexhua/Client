import {type FoundFood} from '../interfaces/tracking/FoundFood';
import {food, foodNutrients, foodUnits} from './Food';
import {nutritions} from './Nutrition';
import {units} from './Unit';

export const foundFood: FoundFood = {
  food,
  foodUnits,
  foodNutrients,
  nutrients: nutritions,
  unitConversions: [],
  units,
};
