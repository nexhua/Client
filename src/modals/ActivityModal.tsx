import React from 'react';
import {Appbar, Button, Modal, Text, TextInput} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import {StyleSheet, View} from 'react-native';
import {
  type Activity,
  type PhysicalActivity,
} from '../interfaces/tracking/PhysicalActivity';
import {running} from '../mocks/Activity';
import {Picker} from '@react-native-picker/picker';
import i18n from '../localization/_i18n';

export interface ActivityModalProps {
  visible: boolean;
  onDismiss: () => void;
  onTrackActivity: (calorie: number) => void;
}

function ActivityModal(props: ActivityModalProps): JSX.Element {
  const [search, setSearch] = React.useState('');
  const [activity, setActivity] = React.useState<
    PhysicalActivity | undefined
  >();
  const [selectedActivity, setSelectedActivity] = React.useState<Activity>();
  const [minutes, setMinutes] = React.useState(0);
  const [kcal, setKcal] = React.useState(0);

  const theme = useAppTheme();

  function searchActivity(text: string): void {
    setSearch(text);

    // Assume found
    setActivity(running);
  }

  function sanitizeCalorie(calorie: string): void {
    const amount = parseInt(calorie);
    if (!isNaN(amount)) {
      setKcal(amount);
    } else {
      setKcal(0);
    }
  }

  function sanitizeMinutes(minutes: string): void {
    const parsedMinutes = parseInt(minutes);
    if (!isNaN(parsedMinutes)) {
      setMinutes(parsedMinutes);
    }
  }

  function trackActivity(): void {
    if (kcal > 0) {
      props.onTrackActivity(kcal);
      props.onDismiss();
    } else {
      if (minutes > 0 && selectedActivity !== undefined) {
        props.onTrackActivity(selectedActivity.met * minutes);
        props.onDismiss();
      }
    }
  }

  let activityPicker;

  if (activity !== undefined) {
    activityPicker = (
      <View>
        <Picker
          selectedValue={activity.activities[0]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedActivity(itemValue);
          }}
          mode="dropdown"
          style={{
            backgroundColor: theme.colors.surfaceVariant,
          }}>
          {activity.activities.map((activity, i) => {
            return (
              <Picker.Item
                key={i}
                label={activity.description}
                value={activity}
              />
            );
          })}
        </Picker>
      </View>
    );
  } else {
    activityPicker = (
      <Picker
        selectedValue={i18n.t('search-activity-warning')}
        mode="dropdown"
        style={{
          backgroundColor: theme.colors.surfaceVariant,
        }}>
        <Picker.Item
          key={0}
          label={i18n.t('search-activity-warning')}
          value={0x00000}
        />
      </Picker>
    );
  }

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
        </Appbar.Header>
        <View style={{marginHorizontal: '5%'}}>
          <TextInput
            style={{marginBottom: '2%'}}
            label={i18n.t('search-activity')}
            value={search}
            onChangeText={text => {
              searchActivity(text);
            }}
          />
          <View style={style.activityContainer}>
            <TextInput
              style={style.minuteContainer}
              label={i18n.t('minutes-title')}
              value={minutes.toString()}
              onChangeText={minutes => {
                sanitizeMinutes(minutes);
              }}
            />
            <View style={style.pickerContainer}>{activityPicker}</View>
          </View>
          <Text
            style={{
              color: theme.colors.muted,
              textAlign: 'center',
              marginVertical: '5%',
            }}>
            {i18n.t('directly-enter-kcal')}
          </Text>
          <TextInput
            label={i18n.t('burned-calorie')}
            value={kcal.toString()}
            onChangeText={text => {
              sanitizeCalorie(text);
            }}
          />
        </View>
        <Button
          style={style.button}
          mode="contained"
          onPress={() => {
            trackActivity();
          }}>
          {i18n.t('track').toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
  },
  minuteContainer: {
    flex: 2,
    margin: 0,
    padding: 0,
  },
  pickerContainer: {
    flex: 6,
    margin: 0,
    padding: 0,
  },
  button: {
    borderRadius: 0,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default ActivityModal;
