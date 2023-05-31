import React from 'react';
import {type WeightTracking} from '../../interfaces/health/trackings/WeightTracking';
import {groupBy} from '../../util/Tracking';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {LineChart, YAxis} from 'react-native-svg-charts';

export interface WeightChartViewProps {
  trackings: WeightTracking[];
}

function WeightChartView(props: WeightChartViewProps): JSX.Element {
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
        value.reduce((prev, cur) => (prev.date > cur.date ? prev : cur))
          .bodyWeight,
      );
    }

    setData(data);
  }, []);

  return (
    <View>
      <Text variant="titleLarge">{i18n.t('weight-chart')}</Text>
      <View style={{height: 200, flexDirection: 'row'}}>
        <YAxis
          data={getValues(data)}
          contentInset={{top: 10, bottom: 10}}
          formatLabel={(value: number) => `${value} KG`}
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

export default WeightChartView;
