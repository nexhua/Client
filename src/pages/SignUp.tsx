import React, {useState} from 'react';
import {
  Button,
  HelperText,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import {type SignUpProps} from '../navigation/NavigationTypes';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '../style/Theme';
import {SignUpWithEmail, getUser} from '../services/auth/Auth';
import {type FirebaseAuthError} from '../types/firebase/Firebase';
import i18n from '../localization/_i18n';

const errorCodes = {
  noError: -1,
  emptyPassword: 0,
  insufficientLength: 1,
  noUpperCase: 2,
  noNumber: 3,
  missingRepeatMatch: 10,
  emptyRepeat: 11,
  emptyEmail: 20,
  invalidEmail: 21,
};

function SignUp({route, navigation}: SignUpProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const theme = useAppTheme();

  function onSignUpSuccess(): void {
    const user = getUser();

    console.log('Created account with success. ', user?.email);
  }

  function onSignUpError(error: FirebaseAuthError | null): void {
    if (error !== null) {
      console.log(error);
    }

    setSnackbarVisible(true);
  }

  function onSubmit(): void {
    setSubmitted(true);

    const emailErr = checkEmailConstraints(email);
    const passwordErr = checkPasswordConstraints(password);
    const repeatErr = checkPasswordRepeatConstraints(passwordRepeat);

    console.log(emailErr, passwordErr, repeatErr);

    if (
      emailErr === errorCodes.noError &&
      passwordErr === errorCodes.noError &&
      repeatErr === errorCodes.noError
    ) {
      console.log(email, password, passwordRepeat);
      SignUpWithEmail(email, password, onSignUpSuccess, onSignUpError);
    }
  }

  function checkPasswordConstraints(text: string): number {
    const [, errorCode] = countPasswordErrors(text);

    return errorCode;
  }

  function checkEmailConstraints(text: string): number {
    if (text === '') {
      return errorCodes.emptyEmail;
    }

    return errorCodes.noError;
  }

  function checkPasswordRepeatConstraints(text: string): number {
    if (text === '') {
      return errorCodes.emptyRepeat;
    }

    if (password !== text) {
      return errorCodes.missingRepeatMatch;
    }

    return errorCodes.noError;
  }

  const emailErr = checkEmailConstraints(email);
  const passwordErr = checkPasswordConstraints(password);
  const repeatErr = checkPasswordRepeatConstraints(passwordRepeat);

  return (
    <View style={style.view}>
      <Text style={style.text} variant="displayMedium">
        {i18n.t('sign-up')}
      </Text>
      <Text
        style={{color: theme.colors.muted, ...style.text}}
        variant="labelMedium">
        {i18n.t('app-slogan')}
      </Text>
      <TextInput
        mode="outlined"
        placeholder={i18n.t('email')}
        onChangeText={text => {
          setSubmitted(false);
          setEmail(text);
        }}
      />
      {submitted && emailErr === errorCodes.emptyEmail && (
        <HelperText type="error">{getErrorMsg(emailErr)}</HelperText>
      )}
      <TextInput
        secureTextEntry={true}
        mode="outlined"
        placeholder={i18n.t('password')}
        onChangeText={text => {
          const [errorCount] = countPasswordErrors(text);
          setSubmitted(false);
          setPassword(text);
          setPasswordCheck(errorCount);
        }}
      />
      {submitted && passwordErr >= 0 && passwordErr < 10 && (
        <HelperText type="error">{getErrorMsg(passwordErr)}</HelperText>
      )}
      <View style={style.passwordContainer}>
        {new Array(4).fill(null).map((_, i) => {
          return (
            <View
              key={i}
              style={{
                ...style.passwordElem,
                marginRight: i === 3 ? 0 : '3%',
                backgroundColor:
                  i < passwordCheck
                    ? style.passwordElem.backgroundColor
                    : theme.colors.outline,
              }}></View>
          );
        })}
      </View>
      <Text variant="labelMedium" style={{color: theme.colors.muted}}>
        {i18n.t('password-warning')}
      </Text>
      <TextInput
        secureTextEntry={true}
        mode="outlined"
        placeholder={i18n.t('password-repeat')}
        onChangeText={text => {
          setSubmitted(false);
          setPasswordRepeat(text);
        }}
      />
      {submitted && repeatErr >= 10 && repeatErr < 20 && (
        <HelperText type="error">{getErrorMsg(repeatErr)}</HelperText>
      )}
      <Button
        style={style.signUp}
        mode="contained"
        onPress={() => {
          onSubmit();
        }}>
        {i18n.t('sign-up')}
      </Button>
      <View style={style.signIn}>
        <Text style={{color: theme.colors.muted, ...style.textVertical}}>
          {i18n.t('already-have-acc')}
        </Text>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          {i18n.t('sign-in')}
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
        icon="close"
        onIconPress={() => {
          setSnackbarVisible(false);
        }}>
        Oops, an error occured
      </Snackbar>
    </View>
  );
}

function countPasswordErrors(text: string): number[] {
  let providedConstraintCount = 0;
  let errorType = errorCodes.noError;

  text.length > 0
    ? (providedConstraintCount += 1)
    : (errorType = errorCodes.emptyPassword);

  text.length > 6
    ? (providedConstraintCount += 1)
    : (errorType = errorCodes.insufficientLength);

  text !== text.toLowerCase()
    ? (providedConstraintCount += 1)
    : (errorType = errorCodes.noUpperCase);

  /\d/.test(text)
    ? (providedConstraintCount += 1)
    : (errorType = errorCodes.noNumber);

  return [providedConstraintCount, errorType];
}

function getErrorMsg(errorCode: number): string {
  switch (errorCode) {
    case errorCodes.noError:
      return '';
    case errorCodes.emptyPassword:
      return i18n.t('password-empty-warning');
    case errorCodes.insufficientLength:
      return i18n.t('password-length-warning');
    case errorCodes.noUpperCase:
      return i18n.t('password-upper-case-warning');
    case errorCodes.noNumber:
      return i18n.t('password-number-warning');
    case errorCodes.missingRepeatMatch:
      return i18n.t('password-repeat-matching-warning');
    case errorCodes.emptyEmail:
      return i18n.t('email-empty-warning');
    case errorCodes.emptyRepeat:
      return i18n.t('password-repeat-empty-warning');
    case errorCodes.invalidEmail:
      return i18n.t('email-invalid-warning');
    default:
      return '';
  }
}

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    marginTop: '2%',
  },
  passwordElem: {
    flex: 1,
    backgroundColor: '#50cd89',
    borderRadius: 50,
    height: 5,
    marginEnd: '3%',
  },
});

export default SignUp;
