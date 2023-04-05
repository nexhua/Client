import {type BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type BottomTabParamList = {
  Tracking: undefined;
  Dietitian: undefined;
  Mealkit: undefined;
};

type TrackingProps = BottomTabNavigationProp<BottomTabParamList, 'Tracking'>;
type DietitianProps = BottomTabNavigationProp<BottomTabParamList, 'Dietitian'>;
type MealkitProps = BottomTabNavigationProp<BottomTabParamList, 'Mealkit'>;

export type {BottomTabParamList, TrackingProps, DietitianProps, MealkitProps};
