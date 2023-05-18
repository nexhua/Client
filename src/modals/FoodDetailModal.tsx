import React from 'react';
import {Appbar, Button, Modal} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import QuantitySelect from '../components/tracking/QuantitySelect';
import MacroNutrientView from '../components/tracking/MacroNutrientView';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Carbs, Fat, Fiber, Protein} from '../constants/NutrientViews';
import i18n from '../localization/_i18n';
import {type FoodUnit} from '../interfaces/nutrition/FoodUnit';
import {type FoundFood} from '../interfaces/tracking/FoundFood';
import {type FoodTracking} from '../interfaces/health/trackings/FoodTracking';
import NutrientDataTable from '../components/common/NutrientDataTable';
import {getUser} from '../services/auth/Auth';

export interface FoodDetailProps {
  visible: boolean;
  onDismiss: () => void;
  onTrack: (foodTracking: FoodTracking) => void;
  foundFood: FoundFood;
  referenceAmount: number;
  referenceUnitId: number;
}

function FoodDetailModal(props: FoodDetailProps): JSX.Element {
  const [amount, setAmount] = React.useState(props.foundFood.food.servingSize);
  const [measurementUnit, setMeasurementUnit] = React.useState<FoodUnit>(
    props.foundFood.foodUnits[0],
  );

  const [rate, setRate] = React.useState(1.0);

  const theme = useAppTheme();

  function handleAmountChange(newAmount: number): void {
    setAmount(newAmount);

    if (
      !isNaN(props.referenceUnitId) &&
      !isNaN(measurementUnit.unitId) &&
      !(isNaN(props.referenceAmount) && !isNaN(amount))
    ) {
      const newRate = getRate(
        props.referenceUnitId,
        measurementUnit.unitId,
        props.referenceAmount,
        newAmount,
      );
      setRate(newRate);
    }
  }

  function handleUnitChange(newUnit: FoodUnit): void {
    setMeasurementUnit(newUnit);

    if (
      !isNaN(props.referenceUnitId) &&
      !isNaN(newUnit.unitId) &&
      !(isNaN(props.referenceAmount) && !isNaN(amount))
    ) {
      const newRate = getRate(
        props.referenceUnitId,
        newUnit.unitId,
        props.referenceAmount,
        amount,
      );
      setRate(newRate);
    }
  }

  function handleOnTrack(): void {
    const user = getUser();

    // // @ts-expect-error In the database missing properties id and generetadAt are auto generated. No need to include them.
    const newTracking: FoodTracking = {
      id: Math.floor(Math.random() * 10000 + 1),
      foodId: props.foundFood.food.id,
      // @ts-expect-error user.uid is string but the database reference is number
      personId: user !== null ? user.uid : -1,
      computedUnitId: props.referenceUnitId === 8 ? 'g' : 'ml',
      computedValue: props.referenceAmount,
      date: new Date(),
      createdAt: new Date(),
      foodName: props.foundFood.food.name,
      meal: 'breakfast',
      unitId: measurementUnit.unitId.toString(),
      value: amount,
    };

    props.onTrack(newTracking);
    props.onDismiss();
  }

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.surfaceVariant,
        flex: 1,
      }}
      dismissable={false}>
      <View style={{height: '100%'}}>
        <ScrollView>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                props.onDismiss();
              }}
            />
            <Appbar.Content title={props.foundFood.food.name.split(',')[0]} />
          </Appbar.Header>

          <View style={{marginHorizontal: '5%', paddingTop: '4%'}}>
            <QuantitySelect
              amount={amount}
              measurementUnit={measurementUnit}
              setAmount={handleAmountChange}
              setMeasurementUnit={handleUnitChange}
              food={props.foundFood}
            />

            <MacroNutrientView
              food={props.foundFood}
              views={[Protein, Carbs, Fat, Fiber]}
              rate={rate}
            />

            <NutrientDataTable
              foodNutrients={props.foundFood.foodNutrients}
              nutrients={props.foundFood.nutrients}
              units={props.foundFood.units}
              rate={rate}
            />
          </View>
        </ScrollView>
        <Button
          style={style.button}
          mode="contained"
          onPress={() => {
            handleOnTrack();
          }}>
          {i18n.t('track').toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
}

// TO DO : get the rate from the unit conversions tables
function getRate(
  referenceId: number,
  unitId: number,
  referenceAmount: number,
  newAmount: number,
): number {
  return (
    ((Math.random() * Math.abs(referenceId - unitId)) / referenceAmount) *
      newAmount +
    Math.random()
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 0,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default FoodDetailModal;
