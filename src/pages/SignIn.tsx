import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {type SignInProps} from '../navigation/NavigationTypes';
import {View, StyleSheet} from 'react-native';
import {useAppTheme} from '../style/Theme';
import {SignInWithEmail, getUser, googleSignIn} from '../services/auth/Auth';
import {type FirebaseAuthError} from '../types/firebase/Firebase';
import i18n from '../localization/_i18n';

function SignIn({route, navigation}: SignInProps): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const theme = useAppTheme();

  function onSubmit(): void {
    // TODO: Sign In
    console.log(email, password);
    if (email !== '' && password !== '') {
      SignInWithEmail(email, password, onSignInSuccess, onSignInError);
    }
  }

  function onSignInSuccess(): void {
    const user = getUser();

    if (user !== null) {
      console.log('Login success.' + email);
    }
  }

  function onSignInError(error: FirebaseAuthError | null): void {
    if (error !== null) {
      console.log(error);
    }
  }

  function signInWithGoogle(): void {
    googleSignIn()
      .then(() => {
        onSignInSuccess();
      })
      .catch(error => {
        const keys = Object.keys(error);
        for (const key of keys) {
          console.log(key, error[key]);
        }
      });
  }

  return (
    <View style={style.view}>
      <View>
        <Text style={style.text} variant="displayMedium">
          {i18n.t('sign-in')}
        </Text>
        <Text
          style={{color: theme.colors.muted, ...style.text}}
          variant="labelMedium">
          {i18n.t('app-slogan')}
        </Text>
        <Button
          icon={require('../../assets/images/google-logo.png')}
          style={style.google}
          mode="outlined"
          onPress={() => {
            signInWithGoogle();
          }}>
          {i18n.t('sign-in-google')}
        </Button>
        <Text
          style={{color: theme.colors.muted, ...style.text}}
          variant="labelSmall">
          {i18n.t('sign-in-or-email')}
        </Text>
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder={i18n.t('email')}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          secureTextEntry={true}
          placeholder={i18n.t('password')}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <Button mode="text">{i18n.t('password-forget')}</Button>
        <Button
          style={style.signIn}
          mode="contained"
          onPress={() => {
            onSubmit();
          }}>
          {i18n.t('sign-in')}
        </Button>
        <View style={style.signUp}>
          <Text style={{color: theme.colors.muted, ...style.textVertical}}>
            {i18n.t('member-msg')}
          </Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            {i18n.t('sign-up')}
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: '1%',
  },
  google: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: '1%',
  },
  input: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: '1%',
  },
  signIn: {
    width: '75%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  signUp: {
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

export default SignIn;
