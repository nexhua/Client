import React from 'react';
import {useAppTheme} from '../../style/Theme';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {Picker} from '@react-native-picker/picker';
import {type FoodPortion, type FoodInfo} from '../../interfaces/Food';

interface QuantitySelectProps {
  amount: number;
  measurementUnit: FoodPortion;
  setAmount: (amount: number) => void;
  setMeasurementUnit: (measureUnit: FoodPortion) => void;
  food: FoodInfo;
}

function QuantitySelect(props: QuantitySelectProps): JSX.Element {
  const theme = useAppTheme();

  function evaluateAmount(text: string): void {
    const number = parseInt(text);

    if (!isNaN(number)) {
      props.setAmount(number);
    } else {
      props.setAmount(1);
    }
  }

  return (
    <View>
      <Text variant="headlineSmall">{i18n.t('pick-mu')}</Text>
      <View style={style.portionView}>
        <View
          style={{
            ...style.amountView,
            ...style.containerBorder,
            borderColor: theme.colors.primary,
          }}>
          <TextInput
            value={String(props.amount)}
            onChangeText={(text: string) => {
              evaluateAmount(text);
            }}
            style={{
              textAlign: 'center',
            }}
          />
        </View>
        <View
          style={{
            ...style.selectView,
            ...style.containerBorder,
            borderColor: theme.colors.primary,
          }}>
          <Picker
            selectedValue={props.measurementUnit}
            onValueChange={(itemValue, itemIndex) => {
              props.setMeasurementUnit(itemValue);
            }}
            mode="dropdown"
            style={{
              backgroundColor: theme.colors.surfaceVariant,
            }}>
            {props.food.foodPortions.map((portion, i) => {
              return (
                portion.gramWeight !== 0 &&
                portion.portionDescription !== 'Quantity not specified' && (
                  <Picker.Item
                    key={i}
                    label={portion.portionDescription}
                    value={portion}
                  />
                )
              );
            })}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  portionView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '4%',
  },
  amountView: {
    flex: 2,
    margin: 0,
    padding: 0,
  },
  selectView: {
    flex: 6,
    margin: 0,
    padding: 0,
    marginLeft: '5%',
  },
  containerBorder: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
});

export default QuantitySelect;
