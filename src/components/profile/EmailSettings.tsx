import React from 'react';
import {type User} from '../../interfaces/identity/User';
import {View, type ViewStyle} from 'react-native';
import {Button, Chip, Text, TextInput} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';
import i18n from '../../localization/_i18n';
import {type FirebaseAuthTypes} from '@react-native-firebase/auth';
import {getUser, verifyUserEmail} from '../../services/auth/Auth';

interface EmailSettingsProps {
  user: User;
  containerStyle: ViewStyle;
  titleStyle: ViewStyle;
  inputStyle: ViewStyle;
  buttonStyle: ViewStyle;
}

function EmailSettings(props: EmailSettingsProps): JSX.Element {
  const [email, setEmail] = React.useState(props.user.email);

  const [firebaseUser] = React.useState<FirebaseAuthTypes.User | null>(
    getUser(),
  );

  const theme = useAppTheme();

  function getIconName(): string {
    if (firebaseUser !== null) {
      return firebaseUser.emailVerified ? 'check-circle' : 'shield-alert';
    } else {
      return props.user.isEmailVerified ? 'check-circle' : 'shield-alert';
    }
  }

  function verifyEmail(): void {
    if (firebaseUser !== null) {
      const firebaseEmail = firebaseUser.email;
      console.log(firebaseEmail === email);
      if (firebaseEmail !== null && firebaseEmail === email) {
        void verifyUserEmail();
      }
    }
  }

  return (
    <>
      <View style={props.containerStyle}>
        <Text style={props.titleStyle} variant="titleLarge">
          {i18n.t('my-email')}
        </Text>
        <TextInput
          style={{...props.inputStyle, borderColor: theme.colors.primary}}
          mode="flat"
          label={i18n.t('email')}
          value={email !== null ? email : ''}
          onChangeText={text => {
            setEmail(text);
          }}
          placeholder={i18n.t('email-placeholder')}
        />

        <Chip
          style={{marginVertical: '1%'}}
          icon={getIconName()}
          onPress={() => {
            verifyEmail();
          }}
          disabled={props.user.isEmailVerified}>
          {props.user.isEmailVerified
            ? i18n.t('email-verified')
            : i18n.t('email-not-verified')}
        </Chip>

        <Button style={props.buttonStyle} mode="contained">
          {i18n.t('save').toUpperCase()}
        </Button>
      </View>
    </>
  );
}

export default EmailSettings;
