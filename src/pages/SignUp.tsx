import React from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {type SignUpProps} from '../navigation/NavigationTypes';

function SignUp({route, navigation}: SignUpProps): JSX.Element {
  console.log('here');
  return (
    <View>
      <Text>Sign Up</Text>
    </View>
  );
}

export default SignUp;
