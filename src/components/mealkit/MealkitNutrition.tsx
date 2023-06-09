import React from 'react';
import {type RecipeNutrients} from '../../interfaces/mealkit/RecipeNutrient';
import {View} from 'react-native';
import NutrientDataTable from '../common/NutrientDataTable';
import {type Nutrient} from '../../interfaces/nutrition/Nutrient';
import {type Units} from '../../interfaces/mealkit/Units';

export interface MealkitNutritionProps {
  recipeNutrition: RecipeNutrients[];
  nutrients: Nutrient[];
  units: Units[];
}

function MealkitNutrition(props: MealkitNutritionProps): JSX.Element {
  return (
    <View>
      <NutrientDataTable
        nutrientInfo={props.recipeNutrition}
        nutrients={props.nutrients}
        units={props.units}
        rate={1.0}
      />
    </View>
  );
}

export default MealkitNutrition;
