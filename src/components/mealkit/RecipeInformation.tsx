import React from 'react';
import {type Allergens} from '../../interfaces/mealkit/Allergens';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import Icon from 'react-native-paper/src/components/Icon';
import {useAppTheme} from '../../style/Theme';

export interface RecipeInformationProps {
  difficulty: number;
  totalTime: number;
  servings: number;
  allergens: Allergens[];
}

function RecipeInformation(props: RecipeInformationProps): JSX.Element {
  const stars: JSX.Element[] = [];

  const theme = useAppTheme();

  for (let i = 0; i < 5; i++) {
    if (i < props.difficulty) {
      stars.push(
        <Icon key={i} source={'star'} color={theme.colors.primary} size={15} />,
      );
    } else {
      stars.push(
        <Icon
          key={i}
          source={'star-outline'}
          color={theme.colors.primary}
          size={15}
        />,
      );
    }
  }

  return (
    <View>
      {props.allergens.length > 0 && (
        <View style={{flexDirection: 'row', marginVertical: '2%'}}>
          <Text variant="titleMedium" style={style.header}>
            {i18n.t('allergens').concat(': ')}
          </Text>
          <Text variant="labelMedium" style={{textAlignVertical: 'center'}}>
            {props.allergens
              .map((elem, i) => {
                return elem.name;
              })
              .join(', ')}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '2%',
        }}>
        <View>
          <Text variant="titleMedium" style={style.header}>
            {i18n.t('total-time')}
          </Text>
          <Text variant="labelMedium">
            {props.totalTime
              .toString()
              .concat(' ', i18n.t('minutes').toLowerCase())}
          </Text>
        </View>

        <View>
          <Text variant="titleMedium" style={style.header}>
            {i18n.t('difficulty')}
          </Text>
          <View style={{flexDirection: 'row'}}>{stars}</View>
        </View>

        <View>
          <Text variant="titleMedium" style={style.header}>
            {i18n.t('serving-amount')}
          </Text>
          <Text variant="labelMedium">
            {props.servings.toString().concat(' ', i18n.t('portion'))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    fontWeight: 'bold',
  },
});

export default RecipeInformation;
