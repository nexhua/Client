import React from 'react';
import {type Instructions} from '../../interfaces/mealkit/Instructions';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';

export interface InstructionProps {
  instruction: Instructions;
}

function Instruction(props: InstructionProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={style.container}>
      <View
        style={{
          ...style.indexContainer,
          backgroundColor: theme.colors.secondary,
        }}>
        <Text
          variant="titleLarge"
          style={{color: theme.colors.onSecondaryContainer}}>
          {props.instruction.index + 1}
        </Text>
      </View>

      <Text variant="bodySmall" style={{flex: 1, flexWrap: 'wrap'}}>
        {'\t'.concat(props.instruction.text)}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '3%',
  },
  indexContainer: {
    width: '15%',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1%',
  },
});

export default Instruction;
