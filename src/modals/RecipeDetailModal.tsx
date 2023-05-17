import React from 'react';
import {type Recipe} from '../interfaces/mealkit/Recipe';
import {Appbar, Modal, Text} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import {Image, ScrollView, View} from 'react-native';
import RecipeInformation from '../components/mealkit/RecipeInformation';
import {
  allergens,
  ingredients,
  recipeIngredients,
  recipeNutrients,
} from '../mocks/Recipe';
import i18n from '../localization/_i18n';
import IngredientList from '../components/mealkit/IngredientList';
import MealkitNutrition from '../components/mealkit/MealkitNutrition';

export interface RecipeDetailModalProps {
  recipe: Recipe;
  visible: boolean;
  isFavorite: boolean;
  onDismiss: () => void;
}

function RecipeDetailModal(props: RecipeDetailModalProps): JSX.Element {
  const [isFavorite, setIsFavorite] = React.useState(props.isFavorite);
  const theme = useAppTheme();

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.surfaceVariant,
        flex: 1,
      }}
      dismissable={false}>
      <View style={{height: '100%'}}>
        <ScrollView>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                props.onDismiss();
              }}
            />
            <Appbar.Content title={props.recipe.name} />
            <Appbar.Action
              icon={isFavorite ? 'heart' : 'heart-outline'}
              color={theme.colors.primary}
              onPress={() => {
                setIsFavorite(!isFavorite);
              }}
            />
          </Appbar.Header>
          <Image
            source={
              props.recipe.imageUrl !== null
                ? {uri: props.recipe.imageUrl}
                : require('../../assets/images/fallback-image.jpg')
            }
            style={{width: '100%', aspectRatio: 1, height: undefined}}
          />
          <View
            style={{
              margin: '5%',
            }}>
            <Text>{props.recipe.description}</Text>

            <RecipeInformation
              difficulty={props.recipe.difficulty}
              totalTime={props.recipe.totalTime}
              servings={props.recipe.servings}
              allergens={allergens}
            />

            <Text variant="headlineSmall">{i18n.t('ingredients')}</Text>
            <IngredientList
              recipeIngredients={recipeIngredients}
              ingredients={ingredients}
            />

            <Text variant="headlineSmall" style={{marginTop: '2%'}}>
              {i18n.t('nutrition-values')}
            </Text>
            <MealkitNutrition recipeNutrition={recipeNutrients} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default RecipeDetailModal;
