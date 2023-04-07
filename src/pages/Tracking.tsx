import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SignOut} from '../services/auth/Auth';
import CalorieTracker from '../components/CalorieTracker';

function Tracking(): JSX.Element {
  return (
    <View>
      <Text>Tracking</Text>
      <Button
        mode="contained"
        onPress={() => {
          SignOut();
        }}>
        Sign Out
      </Button>
      <CalorieTracker />
    </View>
  );
}

export default Tracking;
