import React from 'react';
import {type Person} from '../../interfaces/health/Person';
import {
  macroTypeValues,
  type FoodTrackingInfo,
  mealTypeValues,
} from '../../interfaces/health/trackings/FoodTracking';
import {StyleSheet, View} from 'react-native';
import {LineChart, YAxis} from 'react-native-svg-charts';
import PropertyBar from './PropertyBar';
import i18n from '../../localization/_i18n';
import {isToday} from '../../util/Time';
import {
  getFoodTrackingCalorie,
  getMacroName,
  getMealRatioName,
  getMealType,
  groupBy,
} from '../../util/Tracking';
import {Text} from 'react-native-paper';
import {type Units} from '../../interfaces/mealkit/Units';

export interface CalorieChartViewProps {
  person: Person | undefined;
  units: Units[];
  trackingInfos: FoodTrackingInfo[];
}

const colors = [
  '#F79327',
  '#99627A',
  '#F55050',
  '#ABC4AA',
  '#6D67E4',
  '#FFF9CA',
];

function CalorieChartView(props: CalorieChartViewProps): JSX.Element {
  const [data, setData] = React.useState(new Map<string, number>());

  React.useEffect(() => {
    const graphData: Map<string, [FoodTrackingInfo]> = groupBy(
      props.trackingInfos,
      toDate,
    );

    const iter = graphData.entries();

    const data = new Map<string, number>();

    if (graphData.size > 1) {
      for (const [key, value] of iter) {
        const calories = value
          .map(info => {
            const calorie = getFoodTrackingCalorie(
              info.tracking,
              info.trackingNutrients,
              info.nutrients,
              props.units,
            );
            return calorie;
          })
          .reduce((prev, curr) => prev + curr, 0.0);

        data.set(key, calories);
      }
    } else if (graphData.size === 1) {
      for (const [, value] of iter) {
        value.forEach(info => {
          const calorie = getFoodTrackingCalorie(
            info.tracking,
            info.trackingNutrients,
            info.nutrients,
            props.units,
          );
          data.set(getMealType(info.tracking.meal), calorie);
        });
      }
    }

    setData(data);
  }, []);

  return (
    <View>
      <View style={style.container}>
        {props.person !== undefined && (
          <Text variant="titleLarge">{i18n.t('macro-ratios')}</Text>
        )}
        {props.person !== undefined &&
          macroTypeValues.map((macro, i) => (
            <PropertyBar
              key={i}
              name={i18n.t(macro)}
              value={calcMacro(
                props.person !== undefined ? props.person.calorieGoal : 2000,
                props.person !== undefined
                  ? props.person.customCarbRatio
                  : null,
                getMacroName(macro),
                props.trackingInfos,
              )}
              color={colors[i]}
            />
          ))}
      </View>

      <View style={style.container}>
        <Text variant="titleLarge">{i18n.t('meal-ratios')}</Text>
        {mealTypeValues.map((mealType, i) => {
          return (
            <PropertyBar
              key={i}
              name={getMealRatioName(mealType)}
              value={Math.random()}
              color={colors[i]}
            />
          );
        })}
      </View>

      <View style={style.container}>
        <Text variant="titleLarge">{i18n.t('calorie-chart')}</Text>
        {data.size > 0 && (
          <View style={{height: 200, flexDirection: 'row'}}>
            <YAxis
              data={getValues(data)}
              contentInset={{top: 10, bottom: 10}}
              formatLabel={(value: number) => `${value} Kcal`}
              numberOfTicks={5}
            />
            <LineChart
              style={{flex: 1, width: '100%'}}
              data={getValues(data)}
              svg={{stroke: 'rgb(134, 65, 244)'}}
              contentInset={{top: 10, bottom: 10}}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: ' 2%',
  },
});

function getValues(data: Map<string, number>): number[] {
  const values = [];
  for (const value of data.values()) {
    values.push(value);
  }

  return values;
}

function calcMacro(
  limit: number,
  ratio: number | null,
  macroName: string,
  infos: FoodTrackingInfo[],
): number {
  if (ratio === null) {
    return 0;
  }

  const todaysTrackings = infos.filter(info => isToday(info.tracking.date));

  const value = 0.0;

  for (let i = 0; i < todaysTrackings.length; i++) {
    const today = todaysTrackings[i];

    const nutrient = today.nutrients.find(n =>
      n.name.toLowerCase().includes(macroName.toLowerCase()),
    );

    if (nutrient !== undefined) {
      const nutrientTracking = today.trackingNutrients.find(
        t => t.nutrientId === nutrient.id,
      );

      if (nutrientTracking !== undefined) {
        // TODO : Actually calculate

        return value + Math.random();
      }
    }
  }

  return value + Math.random();
}

function toDate(info: FoodTrackingInfo): string {
  return `${info.tracking.date.getDay()} ${info.tracking.date.getMonth()} ${info.tracking.date.getFullYear()}`;
}

export default CalorieChartView;
