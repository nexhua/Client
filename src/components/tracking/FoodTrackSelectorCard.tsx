import React from 'react';
import {
  type MealTypes,
  type FoodTracking,
} from '../../interfaces/health/trackings/FoodTracking';
import {View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {useAppTheme} from '../../style/Theme';
import {getMealType} from '../../util/Tracking';

export interface FoodTrackSelectorCardProps {
  tracking: FoodTracking | undefined;
  mealType: MealTypes;
  onSelect: (mealType: MealTypes) => void;
  onDelete: (tracking: FoodTracking) => void;
}

function FoodTrackSelectorCard(props: FoodTrackSelectorCardProps): JSX.Element {
  const isTracked = props.tracking !== undefined;
  const theme = useAppTheme();

  const t = props.tracking;

  function getButton(): JSX.Element {
    if (t !== undefined) {
      return (
        <IconButton
          icon={'delete'}
          onPress={() => {
            props.onDelete(t);
          }}
        />
      );
    } else {
      return (
        <IconButton
          icon={'plus'}
          onPress={() => {
            props.onSelect(props.mealType);
          }}
        />
      );
    }
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text variant="bodyLarge">{getMealType(props.mealType)}</Text>
        <Text style={{color: isTracked ? 'black' : theme.colors.muted}}>
          {props.tracking !== undefined
            ? props.tracking.foodName
            : i18n.t('not-tracked-warning')}
        </Text>
      </View>

      <View>{getButton()}</View>
    </View>
  );
}

export default FoodTrackSelectorCard;
