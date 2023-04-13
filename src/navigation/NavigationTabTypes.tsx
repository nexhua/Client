import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type CompositeScreenProps} from '@react-navigation/native';
import {type StackParamList} from './NavigationTypes';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type BottomTabParamList = {
  Tracking: undefined;
  Dietitian: undefined;
  Mealkit: undefined;
  Search: undefined;
  TrackFood: undefined;
};

type TrackingProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Tracking'>,
  NativeStackScreenProps<StackParamList>
>;
type DietitianProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Dietitian'>,
  NativeStackScreenProps<StackParamList>
>;
type MealkitProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Mealkit'>,
  NativeStackScreenProps<StackParamList>
>;

export type {BottomTabParamList, TrackingProps, DietitianProps, MealkitProps};
