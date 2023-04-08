import React from 'react';
import {Surface, Text} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import {StyleSheet, View} from 'react-native';
import CircularBar, {type CircularBarProps} from './CircularBar';
import TrackingButton from './TrackingButton';

interface CircularBarCardProps {
  title: string;
  circularBarProps: CircularBarProps;
  text: string;
  onPress: () => void;
}

function CircularBarCard(props: CircularBarCardProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <View>
      <Text style={style.title} variant="headlineMedium">
        {props.title}
      </Text>
      <Surface
        elevation={5}
        style={{
          ...style.container,
          backgroundColor: theme.colors.surfaceVariant,
        }}>
        <CircularBar {...props.circularBarProps} />
        <View style={{flex: 1}}>
          <Text variant="bodyLarge">{props.text}</Text>
        </View>
        <TrackingButton
          color={props.circularBarProps.color}
          onPress={props.onPress}
        />
      </Surface>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    borderRadius: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  title: {
    marginLeft: '5%',
    marginBottom: '2%',
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
  },
});

export default CircularBarCard;
