import React from 'react';
import {type Person} from '../../interfaces/health/Person';
import {ScrollView, View} from 'react-native';
import {Portal} from 'react-native-paper';
import TrackingCard from '../../components/tracking/TrackingCard';
import i18n from '../../localization/_i18n';
import InputSpinner from 'react-native-input-spinner';
import {useAppTheme} from '../../style/Theme';
import SearchModal from '../../modals/SearchModal';
import FoodDetailModal from '../../modals/FoodDetailModal';
import ActivityModal from '../../modals/ActivityModal';
import {type FoundFood} from '../../interfaces/tracking/FoundFood';
import {
  type FoodTrackingNutrient,
  type FoodTracking,
} from '../../interfaces/health/trackings/FoodTracking';
import {type ActivityTracking} from '../../interfaces/health/trackings/ActivityTracking';
import {type WeightTracking} from '../../interfaces/health/trackings/WeightTracking';
import {type WaterTracking} from '../../interfaces/health/trackings/WaterTracking';

export interface TrackingViewProps {
  person: Person;
  weight: number;
  water: number;
  burnedCalorie: number;
  dailyCalorie: number;
  onFoodTrack: (
    foodTracking: FoodTracking,
    foodTrackingNutrients: FoodTrackingNutrient[],
  ) => void;
  onActivitiyTrack: (activityTracking: ActivityTracking) => void;
  onWeightTrack: (weightTracking: WeightTracking) => void;
  onWaterTrack: (waterTracking: WaterTracking) => void;
}

// Delay for the circular bar animation
const animationDelay = 300;

function TrackingView(props: TrackingViewProps): JSX.Element {
  const [weight, setWeight] = React.useState(props.weight);
  const [water, setWater] = React.useState(props.water);
  const [burnedCalorie, setBurnedCalorie] = React.useState(props.burnedCalorie);
  const [calorie, setCalorie] = React.useState(props.dailyCalorie);

  const [visibleSearch, setVisibleSearch] = React.useState(false);
  const [visibleFoodDetail, setVisibleFoodDetail] = React.useState(false);
  const [visibleActivity, setVisibleActivity] = React.useState(false);

  const [foundFood, setFoundFood] = React.useState<FoundFood>();

  React.useEffect(() => {
    setBurnedCalorie(props.burnedCalorie);
  }, [props.burnedCalorie]);

  React.useEffect(() => {
    setCalorie(props.dailyCalorie);
  }, [props.dailyCalorie]);

  React.useEffect(() => {
    setWeight(props.weight);
  }, [props.weight]);

  React.useEffect(() => {
    setWater(props.water);
  }, [props.water]);

  const showSearchModal = (): void => {
    setVisibleSearch(true);
  };
  const hideSearchModal = (): void => {
    setVisibleSearch(false);
  };

  const showFoodDetailModal = (): void => {
    setVisibleFoodDetail(true);
  };

  const hideFoodDetailModal = (): void => {
    setVisibleFoodDetail(false);
  };

  const showActivityModal = (): void => {
    setVisibleActivity(true);
  };

  const hideActivityModal = (): void => {
    setVisibleActivity(false);
  };

  function onFoodFound(foundFood: FoundFood): void {
    hideSearchModal();
    setFoundFood(foundFood);
    showFoodDetailModal();
  }

  function handleWeightChange(newWeight: number): void {
    const newWeightTracking: WeightTracking = {
      id: Math.floor(Math.random() * 10000),
      personId: 15,
      bodyFatRatio: null,
      bodyWaterRatio: null,
      bodyWeight: newWeight,
      boneMassRatio: null,
      createdAt: new Date(),
      date: new Date(),
      muscleMassRatio: null,
      skeletalMuscleRatio: null,
    };

    props.onWeightTrack(newWeightTracking);
  }

  function handleWaterChange(difference: number): void {
    const waterTracking: WaterTracking = {
      id: Math.floor(Math.random() * 10000),
      personId: 15,
      createdAt: new Date(),
      date: new Date(),
      value: difference,
    };

    props.onWaterTrack(waterTracking);
  }

  const theme = useAppTheme();

  return (
    <ScrollView style={{paddingTop: 10}}>
      <View>
        {/* Calorie Tracking */}
        <TrackingCard
          title={i18n.t('nutrition')}
          text={i18n.t('calorie-card-info-text', {
            amount: props.person.calorieGoal,
          })}
          layout="horizontal"
          hasSpinner={false}
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'orange',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: props.person.calorieGoal,
            currentValue: calorie,
            animationDuration: 500,
            delay: animationDelay,
            hasIcon: true,
            iconName: 'silverware-variant',
            iconSize: 40,
            style: {margin: '5%'},
          }}
          trackingButtonProps={{
            color: 'orange',
            onPress: () => {
              showSearchModal();
            },
            initialValue: calorie,
          }}
        />

        {/* Activity Tracking */}
        <TrackingCard
          title={i18n.t('exercise')}
          text={i18n.t('calorie-card-burn-calorie', {
            target: props.person.activityGoal,
          })}
          layout="horizontal"
          hasSpinner={false}
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'olivedrab',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: props.person.activityGoal,
            currentValue: burnedCalorie,
            animationDuration: 500,
            delay: animationDelay,
            hasIcon: true,
            iconName: 'swim',
            iconSize: 40,
            style: {margin: '5%'},
          }}
          trackingButtonProps={{
            color: 'olivedrab',
            onPress: () => {
              showActivityModal();
            },
            initialValue: burnedCalorie,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
        }}>
        {/* Weight Tracking */}
        <TrackingCard
          title={i18n.t('weight')}
          text={i18n.t('track-weight')}
          layout="vertical"
          hasSpinner={true}
          spinner={
            <InputSpinner
              inputProps={{}}
              max={200}
              min={0}
              step={1}
              value={weight}
              color={theme.colors.outline}
              onChange={num => {
                const parsedInt = parseInt(String(num), 10);
                if (!Number.isNaN(parsedInt)) {
                  handleWeightChange(parsedInt);
                }
              }}
              skin="modern"
            />
          }
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'purple',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: 200,
            currentValue: weight,
            animationDuration: 500,
            delay: animationDelay,
            hasIcon: true,
            iconName: 'weight-kilogram',
            iconSize: 40,
            style: {margin: '5%'},
          }}
        />

        {/* Water Tracking */}
        <TrackingCard
          title={i18n.t('water')}
          text={i18n.t('track-weight')}
          layout="vertical"
          hasSpinner={true}
          spinner={
            <InputSpinner
              inputProps={{}}
              max={props.person.gender === 'm' ? 3000 : 2200}
              min={0}
              step={200}
              value={water}
              color={theme.colors.outline}
              onChange={num => {
                const parsedInt = parseInt(String(num), 10);
                if (!Number.isNaN(parsedInt)) {
                  const diff = parsedInt - water;
                  handleWaterChange(diff);
                }
              }}
              skin="modern"
            />
          }
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'cornflowerblue',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: props.person.gender === 'm' ? 3000 : 2200,
            currentValue: water,
            animationDuration: 500,
            delay: animationDelay,
            hasIcon: true,
            iconName: 'water',
            iconSize: 40,
            style: {margin: '5%'},
          }}
        />
      </View>

      <Portal>
        <SearchModal
          visible={visibleSearch}
          onDismiss={hideSearchModal}
          onSearchResult={onFoodFound}
        />
        {foundFood !== undefined && (
          <FoodDetailModal
            visible={visibleFoodDetail}
            onDismiss={hideFoodDetailModal}
            onTrack={props.onFoodTrack}
            foundFood={foundFood}
            referenceAmount={foundFood.food.servingSize}
            referenceUnitId={foundFood.food.servingSizeUnitId}
          />
        )}
        <ActivityModal
          weight={weight}
          visible={visibleActivity}
          onDismiss={hideActivityModal}
          onTrackActivity={props.onActivitiyTrack}></ActivityModal>
      </Portal>
    </ScrollView>
  );
}

export default TrackingView;
