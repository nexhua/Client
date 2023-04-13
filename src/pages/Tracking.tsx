import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Portal} from 'react-native-paper';
import {SignOut} from '../services/auth/Auth';
import TrackingCard from '../components/tracking/TrackingCard';
import i18n from '../localization/_i18n';
import InputSpinner from 'react-native-input-spinner';
import {useAppTheme} from '../style/Theme';
import {type TrackingProps} from '../navigation/NavigationTabTypes';
import SearchModal from '../modals/SearchModal';
import {type FoodInfo} from '../mocks/Food';
import FoodDetailModal from '../modals/FoodDetailModal';

function Tracking({route, navigation}: TrackingProps): JSX.Element {
  const [weight, setWeight] = React.useState(30);
  const [calorie, setCalorie] = React.useState(500);
  const [water, setWater] = React.useState(0);
  const [burnedCalorie, setBurnedCalorie] = React.useState(100);
  const [visibleSearch, setVisibleSearch] = React.useState(false);
  const [visibleFoodDetail, setVisibleFoodDetail] = React.useState(false);
  const [food, setFood] = React.useState<FoodInfo>();

  const showSearchModal = (): void => {
    setVisibleSearch(true);
  };
  const hideSearchModal = (): void => {
    setVisibleSearch(false);
  };

  const showFoodDetailModal = (): void => {
    setVisibleFoodDetail(true);
  };

  const hideFoodDetailModal = (): void => {
    setVisibleFoodDetail(false);
  };

  function handleNutrition(newCalorie: number): void {
    setCalorie(newCalorie);
  }

  function onFoodFound(food: FoodInfo): void {
    hideSearchModal();
    setFood(food);
    showFoodDetailModal();
  }

  const theme = useAppTheme();

  return (
    <ScrollView style={{paddingTop: 10}}>
      <View>
        <TrackingCard
          title={i18n.t('nutrition')}
          text={i18n.t('calorie-card-info-text', {amount: 2600})}
          layout="horizontal"
          hasSpinner={false}
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'orange',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: 2600,
            currentValue: calorie,
            animationDuration: 1000,
            delay: 0,
            hasIcon: true,
            iconName: 'silverware-variant',
            iconSize: 40,
            style: {margin: '5%'},
          }}
          trackingButtonProps={{
            color: 'orange',
            onPress: (calorie: number) => {
              showSearchModal();
              handleNutrition(calorie);
            },
            initialValue: calorie,
          }}
        />

        <TrackingCard
          title={i18n.t('exercise')}
          text={i18n.t('calorie-card-burn-calorie', {target: 2000})}
          layout="horizontal"
          hasSpinner={false}
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'olivedrab',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: 1000,
            currentValue: burnedCalorie,
            animationDuration: 500,
            delay: 0,
            hasIcon: true,
            iconName: 'swim',
            iconSize: 40,
            style: {margin: '5%'},
          }}
          trackingButtonProps={{
            color: 'olivedrab',
            onPress: (calorie: number) => {
              setBurnedCalorie(calorie);
            },
            initialValue: burnedCalorie,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
        }}>
        <TrackingCard
          title={i18n.t('weight')}
          text={i18n.t('track-weight')}
          layout="vertical"
          hasSpinner={true}
          spinner={
            <InputSpinner
              inputProps={{}}
              max={150}
              min={0}
              step={1}
              value={weight}
              color={theme.colors.outline}
              onChange={num => {
                const parsedInt = parseInt(String(num), 10);
                if (!Number.isNaN(parsedInt)) {
                  setWeight(parsedInt);
                }
              }}
              skin="modern"
            />
          }
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'purple',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: weight > 120 ? 200 : 120,
            currentValue: weight,
            animationDuration: 500,
            delay: 100,
            hasIcon: true,
            iconName: 'weight-kilogram',
            iconSize: 40,
            style: {margin: '5%'},
          }}
        />

        <TrackingCard
          title={i18n.t('water')}
          text={i18n.t('track-weight')}
          layout="vertical"
          hasSpinner={true}
          spinner={
            <InputSpinner
              inputProps={{}}
              max={12}
              min={0}
              step={1}
              value={water}
              color={theme.colors.outline}
              onChange={num => {
                const parsedInt = parseInt(String(num), 10);
                if (!Number.isNaN(parsedInt)) {
                  setWater(parsedInt);
                }
              }}
              skin="modern"
            />
          }
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'cornflowerblue',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: 12,
            currentValue: water,
            animationDuration: 500,
            delay: 0,
            hasIcon: true,
            iconName: 'water',
            iconSize: 40,
            style: {margin: '5%'},
          }}
        />
      </View>

      <Button
        style={{alignSelf: 'flex-end'}}
        mode="contained"
        onPress={() => {
          SignOut();
        }}>
        {i18n.t('sign-out')}
      </Button>

      <Portal>
        <SearchModal
          visible={visibleSearch}
          onDismiss={hideSearchModal}
          onSearchResult={onFoodFound}
        />
        {food !== undefined && (
          <FoodDetailModal
            visible={visibleFoodDetail}
            onDismiss={hideFoodDetailModal}
            food={food}
          />
        )}
      </Portal>
    </ScrollView>
  );
}

export default Tracking;
