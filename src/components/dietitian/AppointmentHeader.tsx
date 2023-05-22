import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppTheme} from '../../style/Theme';
import i18n from '../../localization/_i18n';
import Icon from 'react-native-paper/src/components/Icon';
import {hourToString, toDateString} from '../../util/Time';
import {DatePickerModal} from 'react-native-paper-dates';
import * as RNLocalize from 'react-native-localize';
import {type Time} from './AppointmentPicker';

export interface AppointmentHeaderProps {
  date: Date | undefined;
  selectedTime: Time | undefined;
  setDay: (selectedDay: Date) => void;
}

const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);

const locale = RNLocalize.getLocales()[0];

function AppointmentHeader(props: AppointmentHeaderProps): JSX.Element {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const [selectedDay, setSelectedDay] = React.useState(props.date);
  const [selectedTime, setSelectedTime] = React.useState(props.selectedTime);

  React.useEffect(() => {
    setSelectedTime(props.selectedTime);
  }, [props.selectedTime]);

  const theme = useAppTheme();

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params: {date: Date | undefined}) => {
      setOpenDatePicker(false);
      setSelectedDay(params.date);

      if (params.date !== undefined) {
        props.setDay(params.date);
      }
    },
    [setOpenDatePicker, setSelectedDay],
  );

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text variant="titleSmall" style={{color: theme.colors.muted}}>
          {i18n.t('appointment-date')}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '2%',
            alignItems: 'center',
          }}>
          <Icon size={20} source={'clock'} color={theme.colors.primary} />
          {
            <Text variant="bodyMedium" style={{paddingLeft: '2%'}}>
              {getDateTimeString(selectedDay, selectedTime)}
            </Text>
          }
        </View>
      </View>

      <View>
        <Button
          onPress={() => {
            setOpenDatePicker(true);
          }}>
          {i18n.t('select-day')}
        </Button>
      </View>

      <DatePickerModal
        locale={locale.languageTag === 'tr' ? 'tr' : 'en-GB'}
        mode="single"
        visible={openDatePicker}
        onDismiss={onDismissSingle}
        date={selectedDay}
        onConfirm={onConfirmSingle}
        validRange={{startDate: new Date(), endDate}}
        inputEnabled={false}
      />
    </View>
  );
}

function getDateTimeString(
  day: Date | undefined,
  time: Time | undefined,
): string {
  if (day === undefined) {
    return i18n.t('date-not-selected');
  }

  return `${toDateString(day)}${
    time !== undefined
      ? ' - '.concat(hourToString(time.startTime, time.startMinute))
      : ''
  }`;
}

export default AppointmentHeader;
