import React from 'react';
import {type MainProps} from '../navigation/NavigationTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tracking from './Tracking';
import {type BottomTabParamList} from '../navigation/NavigationTabTypes';
import Dietitian from './Dietitian';
import Mealkit from './Mealkit';
import i18n from '../localization/_i18n';
import Icon from 'react-native-paper/src/components/Icon';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Main({route, navigation}: MainProps): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tracking"
        component={Tracking}
        options={{
          title: i18n.t('tracking'),
          tabBarIcon: ({focused, color, size}) => (
            <Icon source={'cup'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dietitian"
        component={Dietitian}
        options={{
          title: i18n.t('dietitian'),
          tabBarIcon: ({focused, color, size}) => (
            <Icon source={'account'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mealkit"
        component={Mealkit}
        options={{
          title: i18n.t('mealkit'),
          tabBarIcon: ({focused, color, size}) => (
            <Icon source={'bowl-mix'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
