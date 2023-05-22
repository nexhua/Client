import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Appbar, Button, Modal, Text} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import {type Nutritionist} from '../interfaces/dietitian/Dietitian';
import {type NutritionistClient} from '../interfaces/dietitian/Client';
import {type NutritionistAppointment} from '../interfaces/dietitian/Appointment';
import AppointmentPicker, {
  type Time,
} from '../components/dietitian/AppointmentPicker';
import {
  appointments as mockAppointments,
  workingHours as mockWorkingHours,
  clients as mockClients,
} from '../mocks/Dietitian';
import {type WorkingHours} from '../interfaces/dietitian/WorkingHours';
import i18n from '../localization/_i18n';
import AppointmentList from '../components/dietitian/AppointmentList';
import {getUser} from '../services/auth/Auth';
import {type User} from '../interfaces/identity/User';
import {users as mockUsers} from '../mocks/User';
import Icon from 'react-native-paper/src/components/Icon';

export interface DietitianModalProps {
  visible: boolean;
  dietitian: Nutritionist;
  onDismiss: () => void;
}

function DietitianModal(props: DietitianModalProps): JSX.Element {
  const [buildAppointment, setBuildAppointment] = React.useState(false);
  const [, setClients] = React.useState<NutritionistClient[]>([]);
  const [appointments, setAppointments] = React.useState<
    NutritionistAppointment[]
  >([]);
  const [workingHours, setWorkingHours] = React.useState<WorkingHours[]>([]);
  const [, setUser] = React.useState<User>();
  const [client, setClient] = React.useState<NutritionistClient>();

  const theme = useAppTheme();

  React.useEffect(() => {
    // Fetch appointments and clients

    setWorkingHours(mockWorkingHours);
    setAppointments(mockAppointments);
    setClients(mockClients);

    const firebaseUser = getUser();

    if (firebaseUser !== null) {
      const foundUser = mockUsers.find(user => firebaseUser.uid === user.uid);

      if (foundUser !== undefined) {
        setUser(foundUser);

        const client = mockClients.find(c => c.userId === foundUser.id);

        if (client !== undefined) {
          setClient(client);
        }
      }
    }
  }, []);

  function onNewAppointment(date: Date, time: Time): void {
    if (client === undefined) {
      return;
    }

    const appointmentDate = date;

    appointmentDate.setHours(time.startTime, time.startMinute, 0, 0);

    const newAppointment: NutritionistAppointment = {
      id: Math.floor(Math.random() * 10000),
      clientId: client?.id,
      createdAt: new Date(),
      dateTime: appointmentDate,
      notes: null,
    };

    const newAppointments = [...appointments];
    newAppointments.push(newAppointment);
    setAppointments(newAppointments);

    setBuildAppointment(false);
  }

  function onAppointmentDelete(appointment: NutritionistAppointment): void {
    const index = appointments.findIndex(a => a.id === appointment.id);

    if (index !== -1) {
      const updatedAppointments = [...appointments];

      updatedAppointments.splice(index, 1);

      setAppointments(updatedAppointments);
    }
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
        <ScrollView>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                props.onDismiss();
              }}
            />
            <Appbar.Content
              title={`${
                props.dietitian.title !== null ? props.dietitian.title : ''
              } ${props.dietitian.name}`}
            />
          </Appbar.Header>
          {props.dietitian.photoUrl !== null && (
            <Image
              source={{uri: props.dietitian.photoUrl}}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
              }}
            />
          )}
          <View style={{marginHorizontal: '5%', paddingTop: '5%'}}>
            {props.dietitian.biography !== null && (
              <Text>{props.dietitian.biography}</Text>
            )}

            {props.dietitian.address !== null && (
              <View style={{flexDirection: 'row', paddingVertical: '2%'}}>
                <Icon
                  size={20}
                  source={'map-marker'}
                  color={theme.colors.primary}
                />
                <Text variant="bodyMedium">{props.dietitian.address}</Text>
              </View>
            )}

            {client !== undefined && (
              <AppointmentList
                appointments={appointments.filter(
                  a => a.clientId === client.id,
                )}
                nutritionist={props.dietitian}
                client={client}
                onDelete={onAppointmentDelete}
              />
            )}

            {buildAppointment && (
              <AppointmentPicker
                workingHours={workingHours}
                appointments={appointments}
                onCancel={() => {
                  setBuildAppointment(false);
                }}
                onSave={onNewAppointment}
              />
            )}

            {!buildAppointment && (
              <Button
                mode="contained"
                onPress={() => {
                  setBuildAppointment(true);
                }}
                style={{borderRadius: 0, marginVertical: '5%'}}>
                {i18n.t('create-appointment')}
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default DietitianModal;
