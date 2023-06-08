import React from 'react';
import {Appbar, Chip, Modal, Searchbar} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import i18n from '../localization/_i18n';
import {View} from 'react-native';
import {type FoundFood} from '../interfaces/tracking/FoundFood';
import {foundFood as mockFoundFood} from '../mocks/FoundFood';
import {useQuery} from 'jsonapi-react-native';
import {type MealTypes} from '../interfaces/health/trackings/FoodTracking';

export interface SearchModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSearchResult: (food: FoundFood, mealType: MealTypes) => void;
  trackFor: MealTypes;
}

function SearchModal(props: SearchModalProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data, meta, error, isLoading, isFetching} = useQuery([
    'recipes',
    {include: ['utensils', 'ingredients', 'instructions', 'nutrients']},
  ]);

  const [query, setQuery] = React.useState('');
  const theme = useAppTheme();

  const [foundFood] = React.useState<FoundFood>(mockFoundFood);

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
      </Appbar.Header>

      <View>
        <Searchbar
          placeholder={i18n.t('search-food')}
          value={query}
          onChangeText={(text: string) => {
            setQuery(text);
          }}
          mode="view"
        />
      </View>

      <Chip
        style={{backgroundColor: theme.colors.muted, margin: '5%'}}
        onPress={() => {
          props.onSearchResult(foundFood, props.trackFor);
        }}>
        {foundFood.food.name}
      </Chip>
    </Modal>
  );
}

export default SearchModal;
