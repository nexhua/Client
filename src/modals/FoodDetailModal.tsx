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
import NutrientDataTable from '../components/common/NutrientDataTable';

export interface FoodDetailProps {
  visible: boolean;
  onDismiss: () => void;
  foundFood: FoundFood;
}

function FoodDetailModal(props: FoodDetailProps): JSX.Element {
  const [amount, setAmount] = React.useState(1);
  const [measurementUnit, setMeasurementUnit] = React.useState<FoodUnit>(
    props.foundFood.foodUnits[0],
  );

  const theme = useAppTheme();

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
              setAmount={setAmount}
              setMeasurementUnit={setMeasurementUnit}
              food={props.foundFood}
            />

            <MacroNutrientView
              food={props.foundFood}
              views={[Protein, Carbs, Fat, Fiber]}
            />

            <NutrientDataTable
              foodNutrients={props.foundFood.foodNutrients}
              nutrients={props.foundFood.nutrients}
            />
          </View>
        </ScrollView>
        <Button style={style.button} mode="contained">
          {i18n.t('track').toUpperCase()}
        </Button>
      </View>
    </Modal>
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
