import React from 'react';
import {ScrollView, View} from 'react-native';
import DietitianCard from '../components/dietitian/DietitianCard';
import {dietitian} from '../mocks/Dietitian';
import {Searchbar} from 'react-native-paper';

function Dietitian(): JSX.Element {
  const [search, setSearch] = React.useState('');

  return (
    <View style={{height: '100%', marginHorizontal: '5%'}}>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={text => {
            setSearch(text);
          }}
          value={search}
          mode="view"
          style={{marginTop: '5%'}}
        />
        <DietitianCard dietitian={dietitian} />
      </ScrollView>
    </View>
  );
}

export default Dietitian;
