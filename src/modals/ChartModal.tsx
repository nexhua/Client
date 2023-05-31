import React from 'react';
import {View} from 'react-native';
import {Appbar, Modal} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';

export interface ChartModalProps {
  visible: boolean;
  onDismiss: () => void;
  component: JSX.Element;
  title: string;
}

function ChartModal(props: ChartModalProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.surfaceVariant,
        flex: 1,
      }}
      dismissable={false}>
      <View style={{height: '100%'}}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              props.onDismiss();
            }}
          />
          <Appbar.Content title={props.title} />
        </Appbar.Header>
        <View style={{marginHorizontal: '5%'}}>{props.component}</View>
      </View>
    </Modal>
  );
}

export default ChartModal;
