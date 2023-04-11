import React from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {SignOut} from '../services/auth/Auth';
import TrackingCard from '../components/tracking/TrackingCard';
import i18n from '../localization/_i18n';

function Tracking(): JSX.Element {
  const [weight, setWeight] = React.useState(60);

  function handleNutrition(): void {}

  function handleWeight(): void {
    setWeight(weight + 5);
  }

  return (
    <ScrollView style={{paddingTop: 10}}>
      <TrackingCard
        title="Nutrition"
        circularBarProps={{
          radius: 50,
          strokeWidth: 12,
          color: 'orange',
          strokeOpacity: 0.3,
          minValue: 0,
          maxValue: 2600,
          currentValue: 2000,
          animationDuration: 1000,
          delay: 0,
          hasIcon: true,
          iconName: 'silverware-variant',
          iconSize: 40,
          style: {margin: '5%'},
        }}
        text={i18n.t('calorie-card-info-text', {amount: 2600})}
        onPress={handleNutrition}
      />

      <TrackingCard
        title="Weight"
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
        text={i18n.t('track-weight')}
        onPress={handleWeight}
      />

      <Button
        style={{alignSelf: 'flex-end'}}
        mode="contained"
        onPress={() => {
          SignOut();
        }}>
        {i18n.t('sign-out')}
      </Button>
    </ScrollView>
  );
}

export default Tracking;
