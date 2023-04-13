import React from 'react';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';

export interface TrackingButtonProps {
  color: string;
  initialValue: number;
  onPress: (args: number) => void;
}

function TrackingButton(props: TrackingButtonProps): JSX.Element {
  function handleOperation(): void {
    // Do some shit
    props.onPress(props.initialValue + props.initialValue / 2);
  }

  return (
    <View style={{marginEnd: 1}}>
      <Button
        style={{paddingEnd: 0}}
        mode="text"
        onPress={() => {
          handleOperation();
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
