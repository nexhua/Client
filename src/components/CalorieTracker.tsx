import React from 'react';
import {View} from 'react-native';
import CircularBar from './CircularBar';

function CalorieTracker(): JSX.Element {
  return (
    <View>
      <CircularBar
        radius={50}
        strokeWidth={12}
        color="orange"
        strokeOpacity={0.3}
        minValue={0}
        maxValue={2600}
        currentValue={500}
        animationDuration={1000}
        delay={0}
        hasIcon={true}
        iconName="silverware-variant"
      />
    </View>
  );
}

export default CalorieTracker;
