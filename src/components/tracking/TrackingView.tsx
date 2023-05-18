import React from 'react';
import {type Person} from '../../interfaces/health/Person';
import {ScrollView, View} from 'react-native';
import {Button, Portal} from 'react-native-paper';
import {SignOut} from '../../services/auth/Auth';
import TrackingCard from '../../components/tracking/TrackingCard';
import i18n from '../../localization/_i18n';
import InputSpinner from 'react-native-input-spinner';
import {useAppTheme} from '../../style/Theme';
import SearchModal from '../../modals/SearchModal';
import FoodDetailModal from '../../modals/FoodDetailModal';
import ActivityModal from '../../modals/ActivityModal';
import {type FoundFood} from '../../interfaces/tracking/FoundFood';

export interface TrackingViewProps {
  person: Person;
  weight: number;
  water: number;
  burnedCalorie: number;
}

function TrackingView(props: TrackingViewProps): JSX.Element {
  const [weight, setWeight] = React.useState(props.weight);
  const [water, setWater] = React.useState(props.water);
  const [burnedCalorie, setBurnedCalorie] = React.useState(props.burnedCalorie);
  const [calorie, setCalorie] = React.useState(0);

  const [visibleSearch, setVisibleSearch] = React.useState(false);
  const [visibleFoodDetail, setVisibleFoodDetail] = React.useState(false);
  const [visibleActivity, setVisibleActivity] = React.useState(false);

  const [foundFood, setFoundFood] = React.useState<FoundFood>();

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

  const showActivityModal = (): void => {
    setVisibleActivity(true);
  };

  const hideActivityModal = (): void => {
    setVisibleActivity(false);
  };

  function handleNutrition(newCalorie: number): void {
    setCalorie(calorie + newCalorie);
  }

  function onFoodFound(foundFood: FoundFood): void {
    hideSearchModal();
    setFoundFood(foundFood);
    showFoodDetailModal();
  }

  function onTrackActivity(calorie: number): void {
    setBurnedCalorie(burnedCalorie + calorie);
  }

  const theme = useAppTheme();

  return (
    <ScrollView style={{paddingTop: 10}}>
      <View>
        {/* Calorie Tracking */}
        <TrackingCard
          title={i18n.t('nutrition')}
          text={i18n.t('calorie-card-info-text', {
            amount: props.person.calorieGoal,
          })}
          layout="horizontal"
          hasSpinner={false}
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'orange',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: props.person.calorieGoal,
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

        {/* Activity Tracking */}
        <TrackingCard
          title={i18n.t('exercise')}
          text={i18n.t('calorie-card-burn-calorie', {
            target: props.person.activityGoal,
          })}
          layout="horizontal"
          hasSpinner={false}
          circularBarProps={{
            radius: 50,
            strokeWidth: 12,
            color: 'olivedrab',
            strokeOpacity: 0.3,
            minValue: 0,
            maxValue: props.person.activityGoal,
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
              showActivityModal();
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
        {/* Weight Tracking */}
        <TrackingCard
          title={i18n.t('weight')}
          text={i18n.t('track-weight')}
          layout="vertical"
          hasSpinner={true}
          spinner={
            <InputSpinner
              inputProps={{}}
              max={200}
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
            maxValue: 200,
            currentValue: weight,
            animationDuration: 500,
            delay: 100,
            hasIcon: true,
            iconName: 'weight-kilogram',
            iconSize: 40,
            style: {margin: '5%'},
          }}
        />

        {/* Water Tracking */}
        <TrackingCard
          title={i18n.t('water')}
          text={i18n.t('track-weight')}
          layout="vertical"
          hasSpinner={true}
          spinner={
            <InputSpinner
              inputProps={{}}
              max={props.person.gender === 'm' ? 3000 : 2200}
              min={0}
              step={200}
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
            maxValue: props.person.gender === 'm' ? 3000 : 2200,
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
        {foundFood !== undefined && (
          <FoodDetailModal
            visible={visibleFoodDetail}
            onDismiss={hideFoodDetailModal}
            foundFood={foundFood}
          />
        )}
        <ActivityModal
          weight={weight}
          visible={visibleActivity}
          onDismiss={hideActivityModal}
          onTrackActivity={onTrackActivity}></ActivityModal>
      </Portal>
    </ScrollView>
  );
}

export default TrackingView;