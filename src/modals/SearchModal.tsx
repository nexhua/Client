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
  const {data, meta, error, isLoading, isFetching} = useQuery(['recipes']);

  console.log(error);

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      return await fetch('http://localhost:37001/recipes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(async response => {
          console.log(response);
          return await response.json();
        })
        .catch(err => {
          console.log('Error: ', err);
        });
    };

    fetchData()
      .then(data => {
        console.log('Data', data);
      })
      .catch(err => {
        console.log('Err:', err);
      });
  }, []);

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
