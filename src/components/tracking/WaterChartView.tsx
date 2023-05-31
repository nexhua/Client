import React from 'react';
import {type WaterTracking} from '../../interfaces/health/trackings/WaterTracking';
import {groupBy} from '../../util/Tracking';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {LineChart, YAxis} from 'react-native-svg-charts';

export interface WaterChartViewProps {
  trackings: WaterTracking[];
}

function WaterChartView(props: WaterChartViewProps): JSX.Element {
  const [data, setData] = React.useState(new Map<string, number>());

  React.useEffect(() => {
    const graphData = groupBy(
      props.trackings,
      a => `${a.date.getDay()} ${a.date.getMonth()} ${a.date.getFullYear()}`,
    );

    const data = new Map<string, number>();

    for (const [key, value] of graphData.entries()) {
      data.set(
        key,
        value.reduce((acc, cur) => acc + cur.value, 0.0),
      );
    }

    setData(data);
  }, []);

  return (
    <View>
      <Text variant="titleLarge">{i18n.t('water-chart')}</Text>
      <View style={{height: 200, flexDirection: 'row'}}>
        <YAxis
          data={getValues(data)}
          contentInset={{top: 10, bottom: 10}}
          formatLabel={(value: number) => `${value} ml`}
          numberOfTicks={5}
        />
        <LineChart
          style={{flex: 1, width: '100%'}}
          data={getValues(data)}
          svg={{stroke: 'rgb(134, 65, 244)'}}
          contentInset={{top: 10, bottom: 10}}
        />
      </View>
    </View>
  );
}

function getValues(data: Map<string, number>): number[] {
  const values = [];
  for (const value of data.values()) {
    values.push(value);
  }

  return values;
}

export default WaterChartView;
