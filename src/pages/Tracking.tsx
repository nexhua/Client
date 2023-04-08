import React from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {SignOut} from '../services/auth/Auth';
import CircularBarCard from '../components/CircularBarCard';

function Tracking(): JSX.Element {
  return (
    <ScrollView style={{paddingTop: 10}}>
      <CircularBarCard
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
        text="Eat upto 2600 calories!"
        onPress={handleNutrition}
      />

      <CircularBarCard
        title="Weight"
        circularBarProps={{
          radius: 50,
          strokeWidth: 12,
          color: 'purple',
          strokeOpacity: 0.3,
          minValue: 0,
          maxValue: 90,
          currentValue: 70,
          animationDuration: 1000,
          delay: 0,
          hasIcon: true,
          iconName: 'weight-kilogram',
          iconSize: 40,
          style: {margin: '5%'},
        }}
        text="Track your weight!"
        onPress={handleWeight}
      />

      <Button
        style={{alignSelf: 'flex-end'}}
        mode="contained"
        onPress={() => {
          SignOut();
        }}>
        Sign Out
      </Button>
    </ScrollView>
  );
}

function handleNutrition(): void {}

function handleWeight(): void {}

export default Tracking;
