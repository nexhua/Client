import React from 'react';
import {
  mealTypeValues,
  type FoodTracking,
  type MealTypes,
} from '../../interfaces/health/trackings/FoodTracking';
import {isToday} from '../../util/Time';
import {View} from 'react-native';
import FoodTrackSelectorCard from './FoodTrackSelectorCard';
import i18n from '../../localization/_i18n';
import {Text} from 'react-native-paper';

export interface FoodTrackSelectorProps {
  foodTrackings: FoodTracking[];
  onSelect: (mealType: MealTypes) => void;
  onDelete: (tracking: FoodTracking) => void;
}

function FoodTrackSelector(props: FoodTrackSelectorProps): JSX.Element {
  const [trackings, setTrackings] = React.useState(
    props.foodTrackings.filter(t => isToday(t.date)),
  );

  React.useEffect(() => {
    setTrackings(props.foodTrackings.filter(t => isToday(t.date)));
  }, [props.foodTrackings]);

  return (
    <View
      style={{
        marginHorizontal: '5%',
        height: '100%',
        marginBottom: 'auto',
      }}>
      <Text variant="titleMedium" style={{alignSelf: 'center'}}>
        {i18n.t('food-trackings').toUpperCase()}
      </Text>

      <View
        style={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        {mealTypeValues.map((m, i) => {
          const tracking = trackings.find(t => t.meal === m);

          return (
            <FoodTrackSelectorCard
              key={i}
              tracking={tracking}
              mealType={m}
              onSelect={props.onSelect}
              onDelete={props.onDelete}
            />
          );
        })}
      </View>
    </View>
  );
}

export default FoodTrackSelector;
