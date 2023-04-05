import React from 'react';
import {type MainProps} from '../navigation/NavigationTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tracking from './Tracking';
import {type BottomTabParamList} from '../navigation/NavigationTabTypes';
import Dietitian from './Dietitian';
import Mealkit from './Mealkit';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Main({route, navigation}: MainProps): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tracking" component={Tracking} />
      <Tab.Screen name="Dietitian" component={Dietitian} />
      <Tab.Screen name="Mealkit" component={Mealkit} />
    </Tab.Navigator>
  );
}

export default Main;
