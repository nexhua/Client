import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import {Text} from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';

interface UserAvatarProps {
  photoUrl: string | null;
  name: string | null;
}

function UserAvatar(props: UserAvatarProps): JSX.Element {
  const theme = useAppTheme();

  const [content, setContent] = React.useState<JSX.Element>(
    <Icon size={50} source={'account'} color={theme.colors.primary} />,
  );

  React.useEffect(() => {
    createContent(props.photoUrl, props.name);
  }, []);

  function createContent(url: string | null, name: string | null): void {
    if (url !== null) {
      setContent(
        <Image
          style={style.image}
          source={{uri: url}}
          onError={() => {
            createContent(null, name);
          }}
        />,
      );
    } else if (name !== null) {
      setContent(
        <Text variant="displaySmall" style={{color: theme.colors.surface}}>
          {name[0]}
        </Text>,
      );
    } else {
      setContent(
        <Icon size={50} source={'account'} color={theme.colors.surface} />,
      );
    }
  }

  return (
    <View
      style={{
        ...style.container,
        backgroundColor: theme.colors.onSurfaceVariant,
      }}>
      {content}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '20%',
    height: undefined,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default UserAvatar;
