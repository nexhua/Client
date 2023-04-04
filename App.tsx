import React from 'react';
import {Text, View} from 'react-native';
import {Button, Provider as PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <View>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Text>Hello World</Text>
        <Button
          icon="camera"
          mode="contained-tonal"
          onPress={() => {
            console.log('pressed');
          }}>
          Press Me
        </Button>
      </View>
    </PaperProvider>
  );
}

export default App;
