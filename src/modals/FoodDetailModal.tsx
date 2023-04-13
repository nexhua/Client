import React from 'react';
import {Appbar, Modal} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import {type FoodPortion, type FoodInfo} from '../mocks/Food';
import QuantitySelect from '../components/tracking/QuantitySelect';
import {getType, toGram} from '../util/UnitType';
import {Unit} from '../types/tracking/Units';
import MacroNutrientView from '../components/tracking/MacroNutrientView';
import {ScrollView, View} from 'react-native';
import {Carbs, Fat, Fiber, Protein} from '../constants/NutrientViews';

export interface FoodDetailProps {
  visible: boolean;
  onDismiss: () => void;
  food: FoodInfo;
}

function FoodDetailModal(props: FoodDetailProps): JSX.Element {
  const [amount, setAmount] = React.useState(1);
  const [measurementUnit, setMeasurementUnit] = React.useState<FoodPortion>(
    props.food.foodPortions[0],
  );

  const theme = useAppTheme();
  console.log(getType('μg') === Unit.μg);
  console.log(toGram(500, 'μg'));

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.surfaceVariant,
      }}
      dismissable={false}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onDismiss();
          }}
        />
        <Appbar.Content title={props.food.description.split(',')[0]} />
      </Appbar.Header>

      <ScrollView>
        <View style={{margin: '5%'}}>
          <QuantitySelect
            amount={amount}
            measurementUnit={measurementUnit}
            setAmount={setAmount}
            setMeasurementUnit={setMeasurementUnit}
            food={props.food}
          />

          <MacroNutrientView
            food={props.food}
            views={[Protein, Carbs, Fat, Fiber]}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}

export default FoodDetailModal;
