import React, {type ReactNode, type ReactElement} from 'react';
import {
  type Ingredients,
  type RecipeIngredients,
} from '../../interfaces/mealkit/Ingredients';
import IngredientCard, {type IngredientCardProps} from './IngredientCard';
import {View} from 'react-native';

export interface IngredientListProps {
  recipeIngredients: RecipeIngredients[];
  ingredients: Ingredients[];
}

function IngredientList(props: IngredientListProps): JSX.Element {
  const cardProps: IngredientCardProps[] = [];

  for (const recipeIngredient of props.recipeIngredients) {
    const match = props.ingredients.find(
      ingredient => ingredient.id === recipeIngredient.ingredientId,
    );

    if (match !== undefined) {
      cardProps.push({recipeIngredient, ingredient: match});
    }
  }

  const cards: Array<ReactElement<typeof IngredientCard>> = [];

  cardProps.forEach((card, i) => {
    cards.push(
      <IngredientCard
        key={`ingredient_${card.recipeIngredient.id}`}
        recipeIngredient={card.recipeIngredient}
        ingredient={card.ingredient}
      />,
    );
  });

  const view: ReactNode[] = [];

  for (let i = 0; i < cards.length; i += 2) {
    view.push(
      <View key={`row_${i}`}>
        {cards[i]}
        {cards[i + 1]}
      </View>,
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
      {cards}
    </View>
  );
}

export default IngredientList;
