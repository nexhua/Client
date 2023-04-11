import React from 'react';
import {type MainProps} from '../navigation/NavigationTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tracking from './Tracking';
import {type BottomTabParamList} from '../navigation/NavigationTabTypes';
import Dietitian from './Dietitian';
import Mealkit from './Mealkit';
import i18n from '../localization/_i18n';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Main({route, navigation}: MainProps): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tracking"
        component={Tracking}
        options={{title: i18n.t('tracking')}}
      />
      <Tab.Screen
        name="Dietitian"
        component={Dietitian}
        options={{title: i18n.t('dietitian')}}
      />
      <Tab.Screen
        name="Mealkit"
        component={Mealkit}
        options={{title: i18n.t('mealkit')}}
      />
    </Tab.Navigator>
  );
}

export default Main;
