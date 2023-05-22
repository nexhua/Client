import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Appbar, Button, Modal} from 'react-native-paper';
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
import AppointmentCard from '../components/dietitian/AppointmentCard';
import i18n from '../localization/_i18n';

export interface DietitianModalProps {
  visible: boolean;
  dietitian: Nutritionist;
  onDismiss: () => void;
}

function DietitianModal(props: DietitianModalProps): JSX.Element {
  const [buildAppointment, setBuildAppointment] = React.useState(false);

  const [clients, setClients] = React.useState<NutritionistClient[]>([]);
  const [appointments, setAppointments] = React.useState<
    NutritionistAppointment[]
  >([]);
  const [workingHours, setWorkingHours] = React.useState<WorkingHours[]>([]);

  const theme = useAppTheme();

  React.useEffect(() => {
    // Fetch appointments and clients

    setWorkingHours(mockWorkingHours);
    setAppointments(mockAppointments);
    setClients(mockClients);
  }, []);

  function onNewAppointment(date: Date, time: Time): void {
    const appointmentDate = date;

    appointmentDate.setHours(time.startTime, time.startMinute, 0, 0);

    const newAppointment: NutritionistAppointment = {
      id: 0,
      clientId: 15,
      createdAt: new Date(),
      dateTime: appointmentDate,
      notes: null,
    };

    console.log(newAppointment);

    const newAppointments = [...appointments];
    newAppointments.push(newAppointment);
    setAppointments(newAppointments);

    setBuildAppointment(false);
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
          <View style={{marginHorizontal: '5%', paddingTop: '5%'}}>
            {props.dietitian.photoUrl !== null && (
              <Image
                source={{uri: props.dietitian.photoUrl}}
                style={{
                  width: '40%',
                  height: undefined,
                  aspectRatio: 1,
                  borderRadius: 100,
                }}
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

            {appointments.length > 0 && clients.length > 0 && (
              <AppointmentCard
                appointment={appointments[0]}
                client={clients[0]}
                nutritionist={props.dietitian}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default DietitianModal;
