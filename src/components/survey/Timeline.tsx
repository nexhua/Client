import React from 'react';
import TimelineCircle, {type TimelineCircleProps} from './TimelineCircle';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';

export interface TimelineProps {
  circles: TimelineCircleProps[];
}

const operations: Array<TimelineCircleProps<any>> = [
  {
    label: '1',
    isSelected: false,
    onPress: () => {
      return <Text>{1}</Text>;
    },
    handler: (args: string) => {
      console.log(args);
    },
  },
  {
    label: '2',
    isSelected: false,
    onPress: () => {
      return <Text>{2}</Text>;
    },
    handler: (args: string) => {
      console.log(args);
    },
  },
  {
    label: '3',
    isSelected: false,
    onPress: () => {
      return <Text>{3}</Text>;
    },
    handler: (args: string) => {
      console.log(args);
    },
  },
  {
    label: '4',
    isSelected: false,
    onPress: () => {
      return <Text>{4}</Text>;
    },
    handler: (args: string) => {
      console.log(args);
    },
  },
  {
    label: '5',
    isSelected: false,
    onPress: () => {
      return <Text>{5}</Text>;
    },
    handler: (args: string) => {
      console.log(args);
    },
  },
];

function Timeline(props: TimelineProps): JSX.Element {
  const [timelines, setTimelines] = React.useState(operations);

  function updateTimelines(label: string): void {
    const newTimelines = [...timelines];

    const foundIndex = newTimelines.findIndex(t => t.label === label);

    if (foundIndex !== -1) {
      newTimelines.map(t => {
        t.isSelected = false;
        return t;
      });
      newTimelines[foundIndex].isSelected = true;

      console.log(label);
      setTimelines(newTimelines);
    }
  }

  const theme = useAppTheme();

  return (
    <View style={style.container}>
      {timelines.map((timeline, i) => {
        return (
          <TimelineCircle
            key={i}
            label={timeline.label}
            isSelected={timeline.isSelected}
            onPress={updateTimelines}
            handler={timeline.handler}
          />
        );
      })}
      <Divider
        style={{
          backgroundColor: theme.colors.primary,
          ...style.divider,
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    height: 2,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: -1,
  },
});

export default Timeline;
