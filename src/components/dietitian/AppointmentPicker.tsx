import React from 'react';
import {type WorkingHours} from '../../interfaces/dietitian/WorkingHours';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {useAppTheme} from '../../style/Theme';
import HourCard from './HourCard';
import {isSameDay} from '../../util/Time';
import {type NutritionistAppointment} from '../../interfaces/dietitian/Appointment';
import AppointmentHeader from './AppointmentHeader';

export interface AppointmentPickerProps {
  workingHours: WorkingHours[];
  appointments: NutritionistAppointment[];
  onSave: (date: Date, time: Time) => void;
  onCancel: () => void;
}

interface Appointment {
  startingHour: number;
  startingMinute: number;
  time: number;
  selectible: boolean;
  selected: boolean;
}

export interface Time {
  startTime: number;
  startMinute: number;
}

function AppointmentPicker(props: AppointmentPickerProps): JSX.Element {
  const [selectedDay, setSelectedDay] = React.useState<Date>();
  const [appointmentCards, setAppointmentCards] = React.useState<
    Appointment[][]
  >([]);

  const [selectedTime, setSelectedTime] = React.useState<Time>();

  let todaysWorkingHours: WorkingHours | undefined;

  if (selectedDay !== undefined) {
    todaysWorkingHours = props.workingHours.find(
      wh => wh.weekday === selectedDay.getDay(),
    );
  }

  React.useEffect(() => {
    if (todaysWorkingHours !== undefined && selectedDay !== undefined) {
      setAppointmentCards(
        generateProps(
          todaysWorkingHours,
          selectedTime,
          props.appointments,
          selectedDay,
        ),
      );
    }
  }, [selectedTime, selectedDay]);

  function generateRow(props: Appointment[], index: number): JSX.Element {
    const cards = [];

    for (let i = 0; i < props.length; i++) {
      cards.push(
        <HourCard
          key={i}
          startingTime={props[i].startingHour}
          startingMinutes={props[i].startingMinute}
          selectible={props[i].selectible}
          selected={props[i].selected}
          onPress={(time: number, minute: number) => {
            setSelectedTime({startTime: time, startMinute: minute});
          }}
        />,
      );
    }

    return (
      <View key={`hour_card_row_${index}`} style={style.hourContainer}>
        {cards}
      </View>
    );
  }

  const theme = useAppTheme();

  const bodyContent =
    todaysWorkingHours === undefined ? (
      <Text style={{color: theme.colors.muted, padding: '2%'}}>
        {i18n.t('today-not-working-warning')}
      </Text>
    ) : selectedDay !== undefined ? (
      appointmentCards.map((rowProps, i) => generateRow(rowProps, i))
    ) : (
      <></>
    );

  return (
    <View style={{marginVertical: '5%'}}>
      <Text variant="headlineSmall">{i18n.t('create-appointment')}</Text>
      <View
        style={{
          backgroundColor: theme.colors.background,
          elevation: 5,
          borderRadius: 10,
          marginTop: '2%',
        }}>
        <View style={{padding: '2%', paddingBottom: 0}}>
          <View style={{padding: '3%', paddingBottom: 0}}>
            <AppointmentHeader
              date={selectedDay}
              selectedTime={selectedTime}
              setDay={setSelectedDay}
            />
          </View>

          <Divider bold={true} style={{marginVertical: '4%'}} />

          <View>{bodyContent}</View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={props.onCancel}
            style={{borderRadius: 0, flex: 1}}
            textColor={theme.colors.error}>
            {i18n.t('cancel').toUpperCase()}
          </Button>
          <Button
            onPress={() => {
              if (selectedDay !== undefined && selectedTime !== undefined) {
                props.onSave(selectedDay, selectedTime);
              }
            }}
            style={{borderRadius: 0, flex: 1}}>
            {i18n.t('save').toUpperCase()}
          </Button>
        </View>
      </View>
    </View>
  );
}

function generateProps(
  workingHour: WorkingHours,
  selectedTime: Time | undefined,
  appointments: NutritionistAppointment[],
  selectedDay: Date,
): Appointment[][] {
  const workingHours = generateHourArray(
    workingHour.startsAt,
    workingHour.endsAt,
  );

  const selectedDaysAppointments = appointments.filter(appointment =>
    isSameDay(appointment.dateTime, selectedDay),
  );

  const cardProps: Appointment[][] = workingHours.map(hour => {
    let selectedIndex = -1;

    if (selectedTime !== undefined && hour === selectedTime.startTime) {
      const step = 60 / 3;

      selectedIndex = Math.floor(selectedTime.startMinute / step);
    }

    return createRowProps(hour, 3, selectedIndex, selectedDaysAppointments);
  });

  return cardProps;
}

function createRowProps(
  hour: number,
  size: number,
  selected: number,
  takenHours: NutritionistAppointment[],
): Appointment[] {
  const rowProps = [];

  const step = 60 / size;

  for (let i = 0; i < size; i++) {
    const minutes = i * step;

    const taken = takenHours.find(
      taken =>
        taken.dateTime.getHours() === hour &&
        taken.dateTime.getMinutes() === minutes,
    );

    let selectible = true;

    if (taken !== undefined) {
      selectible = false;
    }

    rowProps.push({
      startingHour: hour,
      startingMinute: minutes,
      time: step,
      selectible,
      selected: i === selected,
    });
  }

  return rowProps;
}

function generateHourArray(start: number, end: number): number[] {
  const hours = [];

  for (let i = start; i < end; i++) {
    hours.push(i);
  }
  return hours.filter(hour => hour !== 12);
}

const style = StyleSheet.create({
  hourContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '3%',
  },
});

export default AppointmentPicker;
