import React from 'react';
import {type NutritionistAppointment} from '../../interfaces/dietitian/Appointment';
import {type Nutritionist} from '../../interfaces/dietitian/Dietitian';
import {type NutritionistClient} from '../../interfaces/dietitian/Client';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import AppointmentCard from './AppointmentCard';

export interface AppointmentListProps {
  appointments: NutritionistAppointment[];
  nutritionist: Nutritionist;
  client: NutritionistClient;
  onDelete: (appointment: NutritionistAppointment) => void;
}

function AppointmentList(props: AppointmentListProps): JSX.Element {
  const [userAppointments, setUserAppointments] = React.useState(
    props.appointments,
  );
  const [seeAll, setSeeAll] = React.useState(false);

  React.useEffect(() => {
    setUserAppointments(props.appointments);
  }, [props.appointments]);

  const futureAppointments: NutritionistAppointment[] = userAppointments.filter(
    a => isActive(a.dateTime),
  );
  const pastAppointments: NutritionistAppointment[] = userAppointments.filter(
    a => !isActive(a.dateTime),
  );

  return (
    <View style={{gap: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text variant="headlineSmall">{i18n.t('your-appointments')}</Text>
        <Button
          onPress={() => {
            setSeeAll(!seeAll);
          }}>
          {!seeAll ? i18n.t('see-all') : i18n.t('see-active')}
        </Button>
      </View>

      {futureAppointments.length > 0 && (
        <View style={{gap: 10}}>
          {futureAppointments.map(appointment => {
            return (
              <AppointmentCard
                key={appointment.id}
                nutritionist={props.nutritionist}
                client={props.client}
                appointment={appointment}
                isDeletable={true}
                onDelete={props.onDelete}
              />
            );
          })}
        </View>
      )}

      {futureAppointments.length === 0 &&
        getWarningView(i18n.t('no-active-appointments-warning'))}

      {seeAll && pastAppointments.length > 0 && (
        <View style={{gap: 10}}>
          <Text variant="headlineSmall">{i18n.t('past-appointments')}</Text>
          {pastAppointments.map(appointment => {
            return (
              <AppointmentCard
                key={appointment.id}
                nutritionist={props.nutritionist}
                client={props.client}
                appointment={appointment}
                isDeletable={false}
              />
            );
          })}
        </View>
      )}

      {pastAppointments.length === 0 && seeAll && (
        <>
          <Text variant="headlineSmall">{i18n.t('past-appointments')}</Text>
          {getWarningView(i18n.t('no-past-appointments-warning'))}
        </>
      )}
    </View>
  );
}

function getWarningView(msg: string): JSX.Element {
  return (
    <View>
      <Text>{msg}</Text>
    </View>
  );
}

function isActive(date: Date): boolean {
  const now = new Date();

  return date > now;
}

export default AppointmentList;
