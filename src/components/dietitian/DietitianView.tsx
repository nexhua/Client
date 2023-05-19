import React from 'react';
import {ScrollView, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import DietitianCard from './DietitianCard';
import {dietitian} from '../../mocks/Dietitian';
import {useAppTheme} from '../../style/Theme';

function DietitianView(): JSX.Element {
  const [search, setSearch] = React.useState('');

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
          <DietitianCard dietitian={dietitian} />
        </ScrollView>
      </View>
    </View>
  );
}

export default DietitianView;
