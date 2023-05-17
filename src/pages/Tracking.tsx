import React from 'react';
import {type TrackingProps} from '../navigation/NavigationTabTypes';
import {person as mockPerson} from '../mocks/Person';
import {weightTrackings as mockWeightTrackings} from '../mocks/trackings/WeightTracking';
import TrackingView from '../components/tracking/TrackingView';
import {WaterTrackings as mockWaterTrackings} from '../mocks/trackings/WaterTracking';
import {activityTrackings as mockActivityTrackings} from '../mocks/trackings/ActivityTracking';
import {calorieHelper, today, todayOrLatest} from '../util/Tracking';
import {type WeightTracking} from '../interfaces/health/trackings/WeightTracking';
import {type WaterTracking} from '../interfaces/health/trackings/WaterTracking';
import {type ActivityTracking} from '../interfaces/health/trackings/ActivityTracking';
import {type Person} from '../interfaces/health/Person';
import {ActivityIndicator} from 'react-native-paper';

function Tracking({route, navigation}: TrackingProps): JSX.Element {
  const [initialized, setInitialized] = React.useState(false);

  const [person, setPerson] = React.useState<Person>();
  const [, setWeightTrackings] = React.useState<WeightTracking[]>([]);
  const [, setWaterTrackings] = React.useState<WaterTracking[]>([]);
  const [, setActivityTrackings] = React.useState<ActivityTracking[]>([]);

  const [weight, setWeight] = React.useState(0);
  const [water, setWater] = React.useState(0);
  const [burnedCalorie, setBurnedCalorie] = React.useState(0);

  React.useEffect(() => {
    // On component mount

    setPerson(mockPerson);
    setWeightTrackings(mockWeightTrackings);
    setWaterTrackings(mockWaterTrackings);
    setActivityTrackings(mockActivityTrackings);

    const waterTracking = today<WaterTracking>(mockWaterTrackings);

    setWeight(todayOrLatest<WeightTracking>(mockWeightTrackings).bodyWeight);
    setWater(waterTracking !== null ? waterTracking.value : 0);
    setBurnedCalorie(
      calorieHelper(today<ActivityTracking>(mockActivityTrackings), weight),
    );

    setInitialized(true);
  }, []);

  if (!initialized || person === undefined) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <TrackingView
      person={person}
      weight={weight}
      water={water}
      burnedCalorie={burnedCalorie}
    />
  );
}

export default Tracking;
