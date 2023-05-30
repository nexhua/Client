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
import {type Person} from '../interfaces/health/Person';
import {ActivityIndicator} from 'react-native-paper';
import {
  type FoodTrackingNutrient,
  type FoodTracking,
} from '../interfaces/health/trackings/FoodTracking';
import {
  foodTrackingNutrients as mockFoodTrackingNutrients,
  foodTrackings as mockFoodTrackings,
} from '../mocks/trackings/FoodTracking';
import {nutritionsExcessive as mockNutritions} from '../mocks/Nutrition';
import {units as mockUnits} from '../mocks/Unit';

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

  if (!initialized || person === undefined) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
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
    />
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

export default Tracking;
