import React from 'react';
import {type User} from '../../interfaces/identity/User';
import {StyleSheet, View} from 'react-native';
import UserAvatar from './UserAvatar';
import {IconButton, Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';

interface ProfileHeaderProps {
  user: User;
  openSettings: (visible: boolean) => void;
}

function ProfileHeader(props: ProfileHeaderProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <View>
      <View
        style={{
          marginHorizontal: '5%',
          paddingTop: '10%',
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <UserAvatar photoUrl={props.user.photoUrl} name={props.user.name} />
          <View>
            {props.user.name !== null && (
              <Text variant="titleLarge">{props.user.name}</Text>
            )}

            {props.user.email !== null && (
              <Text
                variant="titleSmall"
                style={{color: theme.colors.muted, fontStyle: 'italic'}}>
                {props.user.email}
              </Text>
            )}
          </View>
          <IconButton
            style={style.settingsButton}
            icon={'cog'}
            onPress={() => {
              props.openSettings(true);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default ProfileHeader;
