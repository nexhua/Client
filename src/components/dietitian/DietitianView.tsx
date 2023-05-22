import React from 'react';
import {ScrollView, View} from 'react-native';
import {Portal, Searchbar} from 'react-native-paper';
import DietitianCard from './DietitianCard';
import {dietitian} from '../../mocks/Dietitian';
import {useAppTheme} from '../../style/Theme';
import DietitianModal from '../../modals/DietitianModal';
import {type Nutritionist} from '../../interfaces/dietitian/Dietitian';

function DietitianView(): JSX.Element {
  const [search, setSearch] = React.useState('');
  const [visibleDietitian, setVisibleDietitian] = React.useState(false);
  const [selectedDietitian, setSelectedDietitian] =
    React.useState<Nutritionist>();

  const theme = useAppTheme();

  return (
    <View style={{height: '100%', backgroundColor: theme.colors.background}}>
      <Searchbar
        placeholder="Search"
        onChangeText={text => {
          setSearch(text);
        }}
        value={search}
        mode="view"
      />
      <View style={{height: '100%', marginHorizontal: '5%'}}>
        <ScrollView>
          <DietitianCard
            dietitian={dietitian}
            onPress={(dietitian: Nutritionist) => {
              setSelectedDietitian(dietitian);
              setVisibleDietitian(true);
            }}
          />
        </ScrollView>
      </View>

      <Portal>
        {selectedDietitian !== undefined && (
          <DietitianModal
            visible={visibleDietitian}
            dietitian={selectedDietitian}
            onDismiss={() => {
              setVisibleDietitian(false);
            }}
          />
        )}
      </Portal>
    </View>
  );
}

export default DietitianView;
