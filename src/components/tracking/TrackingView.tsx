import React from 'react';
import {type TrackingTypes, type Person} from '../../interfaces/health/Person';
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
  type MealTypes,
} from '../../interfaces/health/trackings/FoodTracking';
import {type ActivityTracking} from '../../interfaces/health/trackings/ActivityTracking';
import {type WeightTracking} from '../../interfaces/health/trackings/WeightTracking';
import {type WaterTracking} from '../../interfaces/health/trackings/WaterTracking';
import BottomSheet from '@gorhom/bottom-sheet';
import FoodTrackSelector from './FoodTrackSelector';

export interface TrackingViewProps {
  person: Person;
  weight: number;
  water: number;
  burnedCalorie: number;
  dailyCalorie: number;
  foodTrackings: FoodTracking[];
  onFoodTrack: (
    foodTracking: FoodTracking,
    foodTrackingNutrients: FoodTrackingNutrient[],
  ) => void;
  onActivitiyTrack: (activityTracking: ActivityTracking) => void;
  onWeightTrack: (weightTracking: WeightTracking) => void;
  onWaterTrack: (waterTracking: WaterTracking) => void;
  deleteFoodTrackings: (tracking: FoodTracking) => void;
  onChartSelect: (trackingType: TrackingTypes) => void;
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

  const [foodTrackings, setFoodTrackings] = React.useState(props.foodTrackings);

  const [foundFood, setFoundFood] = React.useState<FoundFood>();
  const [mealType, setMealType] = React.useState<MealTypes>('breakfast');

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['55%'], []);

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

  React.useEffect(() => {
    setFoodTrackings(props.foodTrackings);
  }, [props.foodTrackings]);

  const showSearchModal = (mealType: MealTypes): void => {
    setMealType(mealType);
    setVisibleSearch(true);
    bottomSheetRef.current?.close();
  };

  function onFoodFound(foundFood: FoundFood, mealType: MealTypes): void {
    setVisibleSearch(false);
    setFoundFood(foundFood);
    setMealType(mealType);
    setVisibleFoodDetail(true);
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
    <View style={{height: '100%'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          {/* Calorie Tracking */}
          <TrackingCard
            title={i18n.t('nutrition')}
            text={i18n.t('calorie-card-info-text', {
              amount: props.person.calorieGoal,
            })}
            layout="horizontal"
            hasSpinner={false}
            name="calorie"
            onPress={props.onChartSelect}
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
                bottomSheetRef.current?.expand();
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
            name="burned-calorie"
            onPress={props.onChartSelect}
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
                setVisibleActivity(true);
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
            name="weight"
            onPress={props.onChartSelect}
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
            name="water"
            onPress={props.onChartSelect}
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
            onDismiss={() => {
              setVisibleSearch(false);
            }}
            onSearchResult={onFoodFound}
            trackFor={mealType}
          />
          {foundFood !== undefined && (
            <FoodDetailModal
              visible={visibleFoodDetail}
              onDismiss={() => {
                setVisibleFoodDetail(false);
              }}
              onTrack={props.onFoodTrack}
              foundFood={foundFood}
              mealType={mealType}
              referenceAmount={foundFood.food.servingSize}
              referenceUnitId={foundFood.food.servingSizeUnitId}
            />
          )}
          <ActivityModal
            weight={weight}
            visible={visibleActivity}
            onDismiss={() => {
              setVisibleActivity(false);
            }}
            onTrackActivity={props.onActivitiyTrack}></ActivityModal>
        </Portal>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{backgroundColor: theme.colors.secondaryContainer}}>
          <View style={{flex: 1}}>
            <FoodTrackSelector
              foodTrackings={foodTrackings}
              onSelect={showSearchModal}
              onDelete={t => {
                props.deleteFoodTrackings(t);
                bottomSheetRef.current?.close();
              }}
            />
          </View>
        </BottomSheet>
      </ScrollView>
    </View>
  );
}

export default TrackingView;
