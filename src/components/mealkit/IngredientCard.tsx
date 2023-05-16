import React from 'react';
import {
  type RecipeIngredients,
  type Ingredients,
} from '../../interfaces/mealkit/Ingredients';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {units} from '../../mocks/Recipe';

export interface IngredientCardProps {
  recipeIngredient: RecipeIngredients;
  ingredient: Ingredients;
}

function IngredientCard(props: IngredientCardProps): JSX.Element {
  const unit = units.find(
    elem => elem.id === props.recipeIngredient.amountUnitId,
  );

  return (
    <View style={style.container}>
      <Image style={style.image} source={{uri: props.ingredient.imageUrl}} />
      <View style={{marginLeft: '2%'}}>
        <Text>{props.ingredient.name}</Text>
        <Text>
          {props.recipeIngredient.amount.toString().concat(' ')}
          {unit?.name}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '2%',
    width: '50%',
  },
  image: {
    width: '25%',
    aspectRatio: 1,
  },
});

export default IngredientCard;
