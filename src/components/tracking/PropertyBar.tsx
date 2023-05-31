import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar, Text} from 'react-native-paper';

export interface PropertyBarProps {
  name: string;
  value: number;
  color: string;
}

function PropertyBar(props: PropertyBarProps): JSX.Element {
  return (
    <View style={style.container}>
      <Text variant="titleSmall">{props.name}</Text>
      <View style={{width: '50%'}}>
        <ProgressBar
          style={style.bar}
          animatedValue={props.value}
          color={props.color}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  bar: {
    height: 12,
    borderRadius: 40,
    backgroundColor: '#fffff0',
  },
});

export default PropertyBar;
