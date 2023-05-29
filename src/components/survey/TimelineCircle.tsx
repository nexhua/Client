import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';

export interface TimelineCircleProps {
  label: string;
  isSelected: boolean;
  onPress: (label: string) => void;
}

function TimelineCircle(props: TimelineCircleProps): JSX.Element {
  const [isSelected, setIsSelected] = React.useState(props.isSelected);

  React.useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props.isSelected]);

  const theme = useAppTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress(props.label);
      }}>
      <View
        style={{
          ...style.container,
          backgroundColor: !isSelected
            ? theme.colors.primaryContainer
            : theme.colors.background,
          borderColor: theme.colors.primary,
        }}>
        <Text variant="titleLarge" style={{color: 'black'}}>
          {props.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    width: '15%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimelineCircle;
