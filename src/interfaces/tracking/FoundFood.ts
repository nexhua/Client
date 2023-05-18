import {type Units} from '../mealkit/Units';
import {type Food} from '../nutrition/Food';
import {type FoodNutrient} from '../nutrition/FoodNutrient';
import {type FoodUnit} from '../nutrition/FoodUnit';
import {type Nutrient} from '../nutrition/Nutrient';
import {type UnitConversion} from '../nutrition/UnitConversion';

export interface FoundFood {
  food: Food;
  foodUnits: FoodUnit[];
  unitConversions: UnitConversion[];
  foodNutrients: FoodNutrient[];
  nutrients: Nutrient[];
  units: Units[];
}
