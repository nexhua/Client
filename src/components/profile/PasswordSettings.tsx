import React from 'react';
import {View, type ViewStyle} from 'react-native';
import {Button, Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';

interface PasswordSettingsProps {
  containerStyle: ViewStyle;
  titleStyle: ViewStyle;
  inputStyle: ViewStyle;
  buttonStyle: ViewStyle;
}

function PasswordSettings(props: PasswordSettingsProps): JSX.Element {
  return (
    <View style={props.containerStyle}>
      <Text style={props.titleStyle} variant="titleLarge">
        {i18n.t('my-password')}
      </Text>
      <Button style={props.buttonStyle} mode="contained">
        {i18n.t('send-password-reset').toLocaleUpperCase()}
      </Button>
    </View>
  );
}

export default PasswordSettings;
