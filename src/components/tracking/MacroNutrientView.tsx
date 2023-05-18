import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-paper/src/components/Icon';
import {type NutrientView} from '../../types/tracking/NutrientView';
import {useAppTheme} from '../../style/Theme';
import {Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {type FoundFood} from '../../interfaces/tracking/FoundFood';
import {type Nutrient} from '../../interfaces/nutrition/Nutrient';
import {type FoodNutrient} from '../../interfaces/nutrition/FoodNutrient';
import {type Units} from '../../interfaces/mealkit/Units';
import {units} from '../../mocks/Recipe';

interface MacroNutrientViewProps {
  food: FoundFood;
  views: NutrientView[];
}

interface MacroViewProps {
  foodNutrient: FoodNutrient;
  nutrient: Nutrient;
  unit: Units;
  view: NutrientView;
}

function MacroNutrientView(props: MacroNutrientViewProps): JSX.Element {
  const [viewProps, setViewProps] = React.useState<MacroViewProps[]>([]);
  const theme = useAppTheme();

  console.log(props);

  React.useEffect(() => {
    const macros = props.food.foodNutrients
      .filter(foodNutrient => isMacro(foodNutrient))
      .map(nutrient => createMacroProps(nutrient));

    const filteredMacros: MacroViewProps[] = [];

    for (const prop of macros) {
      if (prop !== undefined) {
        filteredMacros.push(prop);
      }
    }

    setViewProps(filteredMacros);

    function createMacroProps(
      foodNutrient: FoodNutrient,
    ): MacroViewProps | undefined {
      const nutrient = props.food.nutrients.find(
        nutrient => nutrient.id === foodNutrient.nutrientId,
      );

      const viewMatch = props.views.find(view =>
        nutrient?.name.includes(view.name),
      );

      if (viewMatch !== undefined && nutrient !== undefined) {
        const foodUnit = props.food.foodUnits.find(
          foodUnit => foodUnit.unitId === nutrient.unitId,
        );

        if (foodUnit !== undefined) {
          const unit = units.find(unit => unit.id === foodUnit.unitId);

          if (unit !== undefined) {
            const viewProp: MacroViewProps = {
              foodNutrient,
              nutrient,
              unit,
              view: viewMatch,
            };
            return viewProp;
          }
        }
      }
      return undefined;
    }

    function isMacro(foodNutrient: FoodNutrient): boolean {
      const nutrient = props.food.nutrients.find(
        nutrient => nutrient.id === foodNutrient.nutrientId,
      );

      if (nutrient !== undefined) {
        const macro = props.views.find(view =>
          nutrient.name.includes(view.name),
        );

        if (macro !== undefined) {
          return true;
        } else {
          return false;
        }
      }

      return false;
    }
  }, []);

  const MacroView = (prop: MacroViewProps): JSX.Element => {
    return (
      <View style={style.macroViewContainer}>
        <Text
          variant="bodyMedium"
          numberOfLines={1}
          style={{textAlign: 'center', fontWeight: 'bold'}}>
          {prop.view.title}
        </Text>
        <View style={{...style.macroView, backgroundColor: theme.colors.muted}}>
          <Icon
            source={prop.view.iconName}
            size={40}
            color={theme.colors.onPrimary}
          />
        </View>
        <Text
          variant="bodyMedium"
          numberOfLines={1}
          style={{textAlign: 'center', fontWeight: 'bold'}}>
          {String(prop.foodNutrient.amount).concat(' ', prop.unit.name)}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text variant="headlineSmall" style={{marginTop: '5%'}}>
        {i18n.t('macro-nutrient')}
      </Text>
      <View style={style.container}>
        {viewProps.map((prop, i) => {
          return (
            <MacroView
              key={i}
              foodNutrient={prop.foodNutrient}
              nutrient={prop.nutrient}
              view={prop.view}
              unit={prop.unit}
            />
          );
        })}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '4%',
  },
  macroViewContainer: {
    height: undefined,
    width: '20%',
  },
  macroView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    aspectRatio: 1,
  },
});

export default MacroNutrientView;
