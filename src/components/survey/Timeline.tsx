import React from 'react';
import TimelineCircle, {type TimelineCircleProps} from './TimelineCircle';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';

export interface TimelineProps {
  labels: string[];
  activeLabel: string;
  onPress: (label: string) => void;
}

function Timeline(props: TimelineProps): JSX.Element {
  const [timelines, setTimelines] = React.useState<TimelineCircleProps[]>([]);

  React.useEffect(() => {
    const circleProps: TimelineCircleProps[] = [];

    for (let i = 0; i < props.labels.length; i++) {
      const prop: TimelineCircleProps = {
        label: props.labels[i],
        isSelected: props.labels[i] === props.activeLabel,
        onPress: updateTimelines,
      } satisfies TimelineCircleProps;

      circleProps.push(prop);
    }

    setTimelines(circleProps);
  }, []);

  function updateTimelines(label: string): void {
    const newTimelines = [...timelines];

    const foundIndex = newTimelines.findIndex(t => t.label === label);

    if (foundIndex !== -1) {
      newTimelines.map(t => {
        t.isSelected = false;
        return t;
      });
      newTimelines[foundIndex].isSelected = true;

      setTimelines(newTimelines);
      props.onPress(label);
    }
  }

  const theme = useAppTheme();

  return (
    <View style={style.container}>
      {take(timelines, 5, props.activeLabel).map((prop, i) => {
        return (
          <TimelineCircle
            key={i}
            label={prop.label}
            isSelected={prop.isSelected}
            onPress={updateTimelines}
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

function take(
  timelines: TimelineCircleProps[],
  count: number,
  activeLabel: string,
): TimelineCircleProps[] {
  const taken = [];

  if (timelines.length <= count) {
    return timelines;
  } else {
    const activeIndex = timelines.findIndex(t => t.label === activeLabel);

    if (activeIndex === -1) {
      return timelines.slice(0, 5);
    } else {
      taken.push(timelines[activeIndex]);

      let i = count - 1;
      let left = activeIndex - 1;
      let right = activeIndex + 1;

      while (i > 0) {
        if (left >= 0) {
          taken.push(timelines[left]);
          i -= 1;
          left -= 1;
        }

        if (right < timelines.length) {
          taken.push(timelines[right]);
          i -= 1;
          right += 1;
        }
      }
    }
  }

  return taken.sort((a, b) => parseInt(a.label) - parseInt(b.label));
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
