import React from 'react';
import {type TrackingProps} from '../navigation/NavigationTabTypes';
import {person as mockPerson} from '../mocks/Person';
import {weightTrackings as mockWeightTrackings} from '../mocks/trackings/WeightTracking';
import TrackingView from '../components/tracking/TrackingView';
import {WaterTrackings as mockWaterTrackings} from '../mocks/trackings/WaterTracking';
import {activityTrackings as mockActivityTrackings} from '../mocks/trackings/ActivityTracking';
import {
  calorieHelper,
  getFoodTrackingCalorie,
  todayAll,
  todayOrLatest,
} from '../util/Tracking';
import {type WeightTracking} from '../interfaces/health/trackings/WeightTracking';
import {type WaterTracking} from '../interfaces/health/trackings/WaterTracking';
import {type ActivityTracking} from '../interfaces/health/trackings/ActivityTracking';
import {type TrackingTypes, type Person} from '../interfaces/health/Person';
import {ActivityIndicator, Portal} from 'react-native-paper';
import {
  type FoodTrackingNutrient,
  type FoodTracking,
  type FoodTrackingInfo,
} from '../interfaces/health/trackings/FoodTracking';
import {
  foodTrackingNutrients as mockFoodTrackingNutrients,
  foodTrackings as mockFoodTrackings,
} from '../mocks/trackings/FoodTracking';
import {nutritionsExcessive as mockNutritions} from '../mocks/Nutrition';
import {units as mockUnits} from '../mocks/Unit';
import {View} from 'react-native';
import ChartModal from '../modals/ChartModal';
import CalorieChartView from '../components/tracking/CalorieChartView';
import i18n from '../localization/_i18n';
import BurnedCalorieChartView from '../components/tracking/BurnedCalorieChartView';
import WeightChartView from '../components/tracking/WeightChartView';
import WaterChartView from '../components/tracking/WaterChartView';

function Tracking({route, navigation}: TrackingProps): JSX.Element {
  const [initialized, setInitialized] = React.useState(false);

  const [person, setPerson] = React.useState<Person>();
  const [weightTrackings, setWeightTrackings] = React.useState<
    WeightTracking[]
  >([]);
  const [waterTrackings, setWaterTrackings] = React.useState<WaterTracking[]>(
    [],
  );
  const [activityTrackings, setActivityTrackings] = React.useState<
    ActivityTracking[]
  >([]);
  const [foodTrackings, setFoodTrackings] = React.useState<FoodTracking[]>([]);

  const [weight, setWeight] = React.useState(calculateWeight(weightTrackings));
  const [water, setWater] = React.useState(calculateWater(waterTrackings));
  const [burnedCalorie, setBurnedCalorie] = React.useState(0.0);
  const [dailyCalorie, setDailyCalorie] = React.useState(0.0);

  const [chartModalVisible, setChartModalVisible] = React.useState(false);
  const [chartComponent, setChartComponent] = React.useState<JSX.Element>(
    <></>,
  );
  const [chartTitle, setChartTitle] = React.useState('');

  React.useEffect(() => {
    // On component mount

    setPerson(mockPerson);
    setWeightTrackings(mockWeightTrackings);
    setWaterTrackings(mockWaterTrackings);
    setActivityTrackings(mockActivityTrackings);
    setFoodTrackings(mockFoodTrackings);

    setInitialized(true);
  }, []);

  React.useEffect(() => {
    setBurnedCalorie(calculateBurnedCalorie(activityTrackings, weight));
  }, [activityTrackings]);

  React.useEffect(() => {
    setDailyCalorie(calculateCalorie(foodTrackings));
  }, [foodTrackings]);

  React.useEffect(() => {
    setWeight(calculateWeight(weightTrackings));
  }, [weightTrackings]);

  React.useEffect(() => {
    setWater(calculateWater(waterTrackings));
  }, [waterTrackings]);

  function onFoodTrack(
    foodTracking: FoodTracking,
    foodTrackingNutrients: FoodTrackingNutrient[],
  ): void {
    const sameMealType = foodTrackings.find(t => t.meal === foodTracking.meal);

    if (sameMealType === undefined) {
      const newFoodTrackings = [...foodTrackings];
      newFoodTrackings.push(foodTracking);
      setFoodTrackings(newFoodTrackings);
    }
  }

  function onFoodTrackDelete(foodTracking: FoodTracking): void {
    const index = foodTrackings.findIndex(t => t.id === foodTracking.id);

    if (index !== -1) {
      foodTrackings.splice(index, 1);
      setFoodTrackings([...foodTrackings]);
    }
  }

  function onActivitiyTrack(activityTracking: ActivityTracking): void {
    const newActivityTrackings = [...activityTrackings];
    newActivityTrackings.push(activityTracking);
    setActivityTrackings(newActivityTrackings);
  }

  function onWeightTrack(weightTracking: WeightTracking): void {
    const newWeightTrackings = [...weightTrackings];
    newWeightTrackings.push(weightTracking);
    setWeightTrackings(newWeightTrackings);
  }

  function onWaterTrack(waterTracking: WaterTracking): void {
    const newWaterTrackings = [...waterTrackings];
    newWaterTrackings.push(waterTracking);
    setWaterTrackings(newWaterTrackings);
  }

  function onChartTypeSelect(chart: TrackingTypes): void {
    setChartModalVisible(true);
    setChartComponent(getChartComponent(chart));
    setChartTitle(getTitle(chart));
  }

  function getChartComponent(chart: TrackingTypes): JSX.Element {
    switch (chart) {
      case 'calorie':
        return (
          <CalorieChartView
            person={person}
            trackingInfos={foodTrackings.map(t => createFoodTrackingInfos(t))}
            units={mockUnits}
          />
        );
      case 'burned-calorie':
        return (
          <BurnedCalorieChartView
            trackings={activityTrackings}
            weight={weight}
          />
        );
      case 'weight':
        return <WeightChartView trackings={weightTrackings} />;
      case 'water':
        return <WaterChartView trackings={waterTrackings} />;
    }
  }

  function getTitle(chart: TrackingTypes): string {
    switch (chart) {
      case 'calorie':
        return i18n.t('calorie-trackings');
      case 'burned-calorie':
        return i18n.t('burned-calorie-trackings');
      case 'weight':
        return i18n.t('weight-trackings');
      case 'water':
        return i18n.t('water-trackings');
    }
  }

  if (!initialized || person === undefined) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <View>
      <TrackingView
        person={person}
        weight={weight}
        water={water}
        burnedCalorie={burnedCalorie}
        dailyCalorie={dailyCalorie}
        foodTrackings={foodTrackings}
        onFoodTrack={onFoodTrack}
        onActivitiyTrack={onActivitiyTrack}
        onWeightTrack={onWeightTrack}
        onWaterTrack={onWaterTrack}
        deleteFoodTrackings={onFoodTrackDelete}
        onChartSelect={onChartTypeSelect}
      />

      <Portal>
        <ChartModal
          visible={chartModalVisible}
          onDismiss={() => {
            setChartModalVisible(false);
          }}
          component={chartComponent}
          title={chartTitle}
        />
      </Portal>
    </View>
  );
}

function calculateWater(waterTrackings: WaterTracking[]): number {
  return todayAll<WaterTracking>(waterTrackings).reduce(
    (prev, cur) => prev + cur.value,
    0,
  );
}

function calculateCalorie(foodTrackings: FoodTracking[]): number {
  return todayAll<FoodTracking>(foodTrackings)
    .map(tracking => {
      const calorie = getFoodTrackingCalorie(
        tracking,
        mockFoodTrackingNutrients,
        mockNutritions,
        mockUnits,
      );
      return calorie;
    })
    .reduce((prev, curr) => prev + curr, 0.0);
}

function calculateWeight(weightTrackings: WeightTracking[]): number {
  const weightTracking = todayOrLatest<WeightTracking>(weightTrackings);

  if (weightTracking !== null) {
    return weightTracking.bodyWeight;
  } else {
    return 0.0;
  }
}

function calculateBurnedCalorie(
  activityTrackings: ActivityTracking[],
  weight: number,
): number {
  return todayAll<ActivityTracking>(activityTrackings)
    .map(tracking => calorieHelper(tracking, weight))
    .reduce((prev, cur) => prev + cur, 0.0);
}

function createFoodTrackingInfos(tracking: FoodTracking): FoodTrackingInfo {
  return {
    tracking,
    trackingNutrients: mockFoodTrackingNutrients,
    nutrients: mockNutritions,
  } satisfies FoodTrackingInfo;
}

export default Tracking;
