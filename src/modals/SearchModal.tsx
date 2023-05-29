import React from 'react';
import {Appbar, Button, Modal, Searchbar} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import i18n from '../localization/_i18n';
import {View} from 'react-native';
import {type FoundFood} from '../interfaces/tracking/FoundFood';
import {foundFood as mockFoundFood} from '../mocks/FoundFood';
import {useQuery} from 'jsonapi-react-native';

export interface SearchModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSearchResult: (food: FoundFood) => void;
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

      <Button
        onPress={() => {
          props.onSearchResult(foundFood);
        }}>
        assume found
      </Button>
    </Modal>
  );
}

export default SearchModal;
