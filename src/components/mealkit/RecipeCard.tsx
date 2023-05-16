import React from 'react';
import {type Recipe} from '../../interfaces/mealkit/Recipe';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';
import Icon from 'react-native-paper/src/components/Icon';

interface RecipeCardProps {
  recipe: Recipe;
  amount: number;
  onPress: () => void;
  onAdd: () => void;
  onSubtract: () => void;
}

function RecipeCard(props: RecipeCardProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress();
      }}>
      <View style={{...style.container, borderColor: theme.colors.primary}}>
        <Image source={{uri: props.recipe.imageUrl}} style={style.image} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text variant="titleSmall" style={style.title}>
            {props.recipe.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '3%',
              alignItems: 'center',
            }}>
            <Text variant="titleSmall" style={{color: theme.colors.muted}}>
              {props.recipe.servings}
            </Text>
            <Icon source={'account'} size={20} color={theme.colors.muted} />
          </View>
        </View>

        <Text variant="titleMedium" style={{marginLeft: '2%', marginTop: '2%'}}>
          {'$'.concat(props.recipe.price.toString())}
        </Text>

        <View
          style={{
            ...style.counterContainer,
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.surfaceVariant,
          }}>
          {<Text style={{color: theme.colors.primary}}>{props.amount}</Text>}
        </View>

        <IconButton
          mode="contained"
          icon={'plus'}
          size={30}
          style={style.addButton}
          onPress={() => {
            props.onAdd();
          }}
        />

        {props.amount >= 1 && (
          <IconButton
            mode="contained"
            icon={'minus'}
            size={30}
            style={style.minusButton}
            onPress={() => {
              props.onSubtract();
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 10,
    width: '30%',
    paddingBottom: '5%',
    margin: '5%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    marginTop: '2%',
    marginLeft: '2%',
    width: '70%',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 0,
    transform: [{translateX: 30}, {translateY: 25}],
  },
  minusButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0,
    transform: [{translateX: -30}, {translateY: 25}],
  },
  counterContainer: {
    position: 'absolute',
    bottom: 0,
    width: '30%',
    aspectRatio: 1,
    borderRadius: 50,
    left: `${Math.round(25 + 30 / 2)}%`,
    transform: [{translateY: 20}],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeCard;
