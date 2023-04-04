import React from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {type SignInProps} from '../navigation/NavigationTypes';

function SignIn({route, navigation}: SignInProps): JSX.Element {
  return (
    <View>
      <Text>Sign In</Text>
    </View>
  );
}

export default SignIn;
