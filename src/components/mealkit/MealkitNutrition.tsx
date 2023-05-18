import React from 'react';
import {type RecipeNutrients} from '../../interfaces/mealkit/RecipeNutrient';
import {View} from 'react-native';
import NutrientDataTable from '../common/NutrientDataTable';
import {type Nutrient} from '../../interfaces/nutrition/Nutrient';

export interface MealkitNutritionProps {
  recipeNutrition: RecipeNutrients[];
  nutrients: Nutrient[];
}

function MealkitNutrition(props: MealkitNutritionProps): JSX.Element {
  return (
    <View>
      <NutrientDataTable
        foodNutrients={props.recipeNutrition}
        nutrients={props.nutrients}
      />
    </View>
  );
}

export default MealkitNutrition;
