import React from 'react';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';

export interface TrackingButtonProps {
  color: string;
  initialValue: number;
  onPress: () => void;
}

function TrackingButton(props: TrackingButtonProps): JSX.Element {
  return (
    <View style={{marginEnd: 1}}>
      <Button
        style={{paddingEnd: 0}}
        mode="text"
        onPress={() => {
          props.onPress();
        }}
        labelStyle={{
          fontSize: 26,
          color: props.color,
          marginEnd: 0,
        }}
        icon="plus-circle">
        <Text style={{position: 'absolute'}}>{''}</Text>
      </Button>
    </View>
  );
}

export default TrackingButton;
