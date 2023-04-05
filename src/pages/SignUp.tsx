import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {type SignUpProps} from '../navigation/NavigationTypes';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '../style/Theme';
import {SignUpWithEmail, getUser} from '../services/auth/Auth';
import {type FirebaseAuthError} from '../types/firebase/Firebase';

function SignUp({route, navigation}: SignUpProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const theme = useAppTheme();

  const style = StyleSheet.create({
    view: {
      minHeight: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      marginHorizontal: '5%',
    },
    text: {
      textAlign: 'center',
      marginVertical: '1%',
    },
    signUp: {
      width: '100%',
      borderRadius: 5,
      marginVertical: '2%',
    },
    signIn: {
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      marginTop: '1%',
    },
    textVertical: {
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });

  function onSignUpSuccess(): void {
    const user = getUser();

    console.log('Created account with success. ', user?.email);
  }

  function onSignUpError(error: FirebaseAuthError | null): void {
    if (error !== null) {
      console.log(error);
    }
  }

  function onSubmit(): void {
    if (
      email !== '' &&
      password !== '' &&
      passwordRepeat !== '' &&
      password === passwordRepeat
    ) {
      console.log(email, password, passwordRepeat);
      SignUpWithEmail(email, password, onSignUpSuccess, onSignUpError);
    }
  }

  return (
    <View style={style.view}>
      <Text style={style.text} variant="displayMedium">
        Sign Up
      </Text>
      <Text
        style={{color: theme.colors.muted, ...style.text}}
        variant="labelMedium">
        Your Health Application
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Email"
        onChangeText={text => {
          setEmail(text);
        }}
      />
      <TextInput
        secureTextEntry={true}
        mode="outlined"
        placeholder="Password"
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <TextInput
        secureTextEntry={true}
        mode="outlined"
        placeholder="Repeat Password"
        onChangeText={text => {
          setPasswordRepeat(text);
        }}
      />
      <Button
        style={style.signUp}
        mode="contained"
        onPress={() => {
          onSubmit();
        }}>
        Sign Up
      </Button>
      <View style={style.signIn}>
        <Text style={{color: theme.colors.muted, ...style.textVertical}}>
          Already have an Account?
        </Text>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          Sign In
        </Button>
      </View>
    </View>
  );
}

export default SignUp;
