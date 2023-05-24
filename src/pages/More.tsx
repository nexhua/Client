import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import {type User} from '../interfaces/identity/User';
import {SignOut, getUser} from '../services/auth/Auth';
import {users} from '../mocks/User';
import {useAppTheme} from '../style/Theme';
import {Button, Portal} from 'react-native-paper';
import i18n from '../localization/_i18n';
import SettingsModal from '../modals/SettingsModal';

function More(): JSX.Element {
  const [user, setUser] = React.useState<User>();
  const [settingsModal, setSettingsModal] = React.useState(false);

  React.useEffect(() => {
    const firebaseId = getUser()?.uid;

    if (firebaseId !== undefined) {
      const user = users.find(u => u.uid === firebaseId);

      if (user !== undefined) {
        setUser(user);
      }
    }
  }, []);

  const theme = useAppTheme();

  return (
    <View
      style={{
        ...style.container,
        backgroundColor: theme.colors.surfaceVariant,
      }}>
      {user !== undefined && (
        <ProfileHeader user={user} openSettings={setSettingsModal} />
      )}

      <View style={{paddingBottom: '20%'}}>
        <Button
          style={style.button}
          mode="text"
          onPress={() => {
            setSettingsModal(true);
          }}>
          {i18n.t('settings')}
        </Button>
        <Button
          style={style.button}
          mode="text"
          onPress={() => {
            SignOut();
          }}>
          {i18n.t('sign-out')}
        </Button>
      </View>

      <Portal>
        {user !== undefined && (
          <SettingsModal
            visible={settingsModal}
            user={user}
            onDismiss={() => {
              setSettingsModal(false);
            }}
          />
        )}
      </Portal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    borderRadius: 0,
  },
});

export default More;
