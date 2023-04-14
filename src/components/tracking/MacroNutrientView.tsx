import React from 'react';
import {StyleSheet, View} from 'react-native';
import {type FoodNutrient, type FoodInfo} from '../../mocks/Food';
import Icon from 'react-native-paper/src/components/Icon';
import {type NutrientView} from '../../types/tracking/NutrientView';
import {useAppTheme} from '../../style/Theme';
import {Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';

interface MacroNutrientViewProps {
  food: FoodInfo;
  views: NutrientView[];
}

interface MacroViewProps {
  nutrient: FoodNutrient;
  view: NutrientView;
}

function MacroNutrientView(props: MacroNutrientViewProps): JSX.Element {
  const [viewProps, setViewProps] = React.useState<MacroViewProps[]>([]);

  const theme = useAppTheme();

  React.useEffect(() => {
    const macros = props.food.foodNutrients
      .filter(nutrient => isMacro(nutrient))
      .map(nutrient => createMacroProps(nutrient));

    const filteredMacros: MacroViewProps[] = [];

    for (const prop of macros) {
      if (prop !== undefined) {
        filteredMacros.push(prop);
      }
    }

    setViewProps(filteredMacros);

    function createMacroProps(
      nutrient: FoodNutrient,
    ): MacroViewProps | undefined {
      const viewMatch = props.views.find(view =>
        nutrient.nutrient.name.includes(view.name),
      );

      if (viewMatch !== undefined) {
        const viewProp: MacroViewProps = {
          nutrient,
          view: viewMatch,
        };
        return viewProp;
      }
      return undefined;
    }

    function isMacro(nutrient: FoodNutrient): boolean {
      for (const name of props.views.map(view => view.name)) {
        if (nutrient.nutrient.name.includes(name)) {
          return true;
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
          {String(prop.nutrient.amount).concat(
            ' ',
            prop.nutrient.nutrient.unitName,
          )}
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
            <MacroView key={i} nutrient={prop.nutrient} view={prop.view} />
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
