import React from 'react';
import {Appbar, Modal} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import i18n from '../localization/_i18n';
import {View} from 'react-native';
import Timeline from '../components/survey/Timeline';
import {range} from '../util/Time';

export interface SurveyModalProps {
  visible: boolean;
  onDismiss: () => void;
}

function SurveyModal(props: SurveyModalProps): JSX.Element {
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
        <Appbar.Content title={i18n.t('survey')} />
      </Appbar.Header>

      <View style={{margin: '5%'}}>
        <Timeline
          circles={range(0, 5).map(num => {
            return {label: num.toString()};
          })}
        />
      </View>
    </Modal>
  );
}

export default SurveyModal;
