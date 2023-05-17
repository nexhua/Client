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
import StyledDropdown from '../style/StyledDropdown';
import {type UserAddress} from '../interfaces/address/UserAddress';
import {
  userAddresses as mockUserAddresses,
  address as addresses,
} from '../mocks/Address';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Main({route, navigation}: MainProps): JSX.Element {
  const [userAddresses, setUserAddresses] = React.useState<UserAddress[]>([]);
  const [value, setValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    setUserAddresses(mockUserAddresses);

    const activeAddress = mockUserAddresses.find(a => a.isActive);

    if (activeAddress !== undefined) {
      setValue(activeAddress.id.toString());
    }
  }, []);

  const theme = useAppTheme();

  const [mealkitCart, setMealkitCart] = React.useState<ShoppingCart<Recipe>>({
    items: [],
  });

  const mealkitContext: CartContext = {
    cart: mealkitCart,
    setCart: setMealkitCart,
  };

  function createLabel(address: UserAddress): string {
    const foundAddress = addresses.find(a => a.id === address.addressId);

    return `${address.name} - ${
      foundAddress !== undefined ? foundAddress.neighbourhood : ''
    }, ${foundAddress !== undefined ? foundAddress.street : ''}`;
  }

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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    flexGrow: 1,
                  }}>
                  <Icon
                    source={'map-marker'}
                    size={35}
                    color={theme.colors.primary}
                  />
                  <StyledDropdown
                    value={value}
                    setValue={setValue}
                    items={userAddresses.map(elem => ({
                      label: createLabel(elem),
                      value: elem.id.toString(),
                    }))}
                  />
                </View>

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
    marginLeft: '10%',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
});

export default Main;
