import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';
import {fillTwo} from '../../util/Time';

export interface HourCardProps {
  startingTime: number;
  startingMinutes: number;
  selectible: boolean;
  selected: boolean;
  onPress: (hour: number, minute: number) => void;
}

function HourCard(props: HourCardProps): JSX.Element {
  const theme = useAppTheme();

  let mainColor = theme.colors.primary;
  let backgroundColor = theme.colors.secondaryContainer;

  if (!props.selectible) {
    mainColor = theme.colors.muted;
    backgroundColor = 'rgba(189,195,199,0.7)';
  }

  const borderStyle = {borderWidth: 2, borderColor: theme.colors.primary};

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.selectible) {
          props.onPress(props.startingTime, props.startingMinutes);
        }
      }}>
      <View
        style={[
          style.container,
          {backgroundColor},
          props.selectible && props.selected && borderStyle,
        ]}>
        <Text variant="headlineSmall" style={{color: mainColor}}>
          {`${props.startingTime}:${fillTwo(props.startingMinutes)} `}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
});

export default HourCard;
