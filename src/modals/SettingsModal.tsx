import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Modal} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import i18n from '../localization/_i18n';
import {type User} from '../interfaces/identity/User';
import AccountSettings from '../components/profile/AccountSettings';
import EmailSettings from '../components/profile/EmailSettings';
import PasswordSettings from '../components/profile/PasswordSettings';

interface SettingsModalProps {
  visible: boolean;
  user: User;
  onDismiss: () => void;
}

function SettingsModal(props: SettingsModalProps): JSX.Element {
  function onUserInfoChange(
    name: string,
    cellNo: string,
    day: number,
    year: number,
    month: string,
  ): void {
    // Process
  }

  const theme = useAppTheme();

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.surfaceVariant,
      }}
      dismissable={false}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onDismiss();
          }}
        />
        <Appbar.Content title={i18n.t('settings')} />
      </Appbar.Header>

      <View style={{margin: '5%'}}>
        <AccountSettings
          user={props.user}
          containerStyle={style.container}
          titleStyle={style.title}
          inputStyle={style.input}
          buttonStyle={style.button}
          onSave={onUserInfoChange}
        />

        <EmailSettings
          user={props.user}
          containerStyle={style.container}
          titleStyle={style.title}
          inputStyle={style.input}
          buttonStyle={style.button}
        />

        <PasswordSettings
          containerStyle={style.container}
          titleStyle={style.title}
          inputStyle={style.input}
          buttonStyle={style.button}
        />
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  title: {
    marginBottom: '2%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    marginVertical: '1%',
  },
  button: {
    borderRadius: 0,
  },
});

export default SettingsModal;
