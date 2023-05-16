import React from 'react';
import {type MainProps} from '../navigation/NavigationTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tracking from './Tracking';
import {type BottomTabParamList} from '../navigation/NavigationTabTypes';
import Dietitian from './Dietitian';
import Mealkit from './Mealkit';
import i18n from '../localization/_i18n';
import Icon from 'react-native-paper/src/components/Icon';
import {Badge, IconButton} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import {StyleSheet, View} from 'react-native';
import {type Recipe} from '../interfaces/mealkit/Recipe';
import {type ShoppingCart} from '../interfaces/cart/ShoppingCart';
import {
  type CartContext,
  MealkitCartContext,
} from '../contexts/MealkitCartContext';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Main({route, navigation}: MainProps): JSX.Element {
  const theme = useAppTheme();

  const [mealkitCart, setMealkitCart] = React.useState<ShoppingCart<Recipe>>({
    items: [],
  });

  const mealkitContext: CartContext = {
    cart: mealkitCart,
    setCart: setMealkitCart,
  };

  return (
    <MealkitCartContext.Provider value={mealkitContext}>
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
            headerRight: () => (
              <View style={style.container}>
                <IconButton
                  icon={'cart-variant'}
                  onPress={() => {}}
                  iconColor={theme.colors.primary}
                  size={35}
                />

                <Badge
                  visible={mealkitCart.items.length > 0}
                  style={{
                    ...style.badge,
                    backgroundColor: theme.colors.tertiary,
                  }}
                  size={25}>
                  {mealkitCart.items.reduce(
                    (sum, current) => sum + current.amount,
                    0,
                  )}
                </Badge>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </MealkitCartContext.Provider>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '2%',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
});

export default Main;
