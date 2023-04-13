import React from 'react';
import {Surface, Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';
import {StyleSheet, View} from 'react-native';
import CircularBar, {type CircularBarProps} from './CircularBar';
import TrackingButton, {type TrackingButtonProps} from './TrackingButton';

interface TrackingCardProps {
  title: string;
  text: string;
  layout: 'vertical' | 'horizontal';
  circularBarProps: CircularBarProps;
  trackingButtonProps?: TrackingButtonProps;
  hasSpinner: boolean;
  spinner?: JSX.Element;
}

function TrackingCard(props: TrackingCardProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      style={{
        width: props.layout === 'horizontal' ? '100%' : '45%',
      }}>
      <Text style={style.title} variant="headlineMedium">
        {props.title}
      </Text>
      <Surface
        elevation={5}
        style={{
          ...style.container,
          backgroundColor: theme.colors.surfaceVariant,
          flexDirection: props.layout === 'horizontal' ? 'row' : 'column',
        }}>
        <CircularBar {...props.circularBarProps} />
        {props.layout === 'horizontal' && (
          <View style={{flex: 1}}>
            <Text variant="bodyLarge">{props.text}</Text>
          </View>
        )}
        {props.layout === 'vertical' && props.hasSpinner && (
          <View style={{marginBottom: '5%'}}>{props.spinner}</View>
        )}
        {props.trackingButtonProps !== undefined && (
          <TrackingButton
            color={props.circularBarProps.color}
            onPress={props.trackingButtonProps.onPress}
            initialValue={props.trackingButtonProps.initialValue}
          />
        )}
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

export default TrackingCard;
