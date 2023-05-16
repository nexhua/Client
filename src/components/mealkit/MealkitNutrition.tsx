import React from 'react';
import {type RecipeNutrients} from '../../interfaces/mealkit/RecipeNutrient';
import {nutritions} from '../../mocks/Nutrition';
import {View} from 'react-native';
import {type FoodNutrient} from '../../interfaces/nutrition/Nutrient';
import NutrientDataTable from '../common/NutrientDataTable';

export interface MealkitNutritionProps {
  recipeNutrition: RecipeNutrients[];
}

function MealkitNutrition(props: MealkitNutritionProps): JSX.Element {
  const foodNutrients: FoodNutrient[] = [];

  for (const recipeNutrient of props.recipeNutrition) {
    const nutrient = nutritions.find(
      elem => elem.id === recipeNutrient.nutrientId,
    );
    if (nutrient !== undefined) {
      foodNutrients.push({
        nutrient,
        amount: recipeNutrient.amount,
      });
    }
  }

  return (
    <View>
      <NutrientDataTable nutrients={foodNutrients} />
    </View>
  );
}

export default MealkitNutrition;
