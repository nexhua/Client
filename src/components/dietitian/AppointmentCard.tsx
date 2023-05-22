import React from 'react';
import {type NutritionistAppointment} from '../../interfaces/dietitian/Appointment';
import {Image, View} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import {type NutritionistClient} from '../../interfaces/dietitian/Client';
import {Divider, Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {type Nutritionist} from '../../interfaces/dietitian/Dietitian';
import Icon from 'react-native-paper/src/components/Icon';
import {toDateTimeString} from '../../util/Time';

export interface AppointmentCardProps {
  nutritionist: Nutritionist;
  appointment: NutritionistAppointment;
  client: NutritionistClient;
}

function AppointmentCard(props: AppointmentCardProps): JSX.Element {
  const [icon, setIcon] = React.useState(
    props.nutritionist.photoUrl !== null
      ? {uri: props.nutritionist.photoUrl}
      : require('../../../assets/images/fallback-image.jpg'),
  );

  const theme = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: '5%',
        borderRadius: 10,
        elevation: 5,
      }}>
      <Text variant="titleSmall" style={{color: theme.colors.muted}}>
        {i18n.t('appointment-date')}
      </Text>

      <View
        style={{flexDirection: 'row', marginTop: '2%', alignItems: 'center'}}>
        <Icon size={20} source={'clock'} color={theme.colors.primary} />
        <Text variant="bodyMedium" style={{paddingLeft: '2%'}}>
          {toDateTimeString(props.appointment.dateTime)}
        </Text>
      </View>

      <Divider bold={true} style={{marginVertical: '3%'}} />

      <View style={{flexDirection: 'row'}}>
        <View style={{width: '30%'}}>
          <Image
            source={icon}
            style={{
              width: '100%',
              aspectRatio: 1,
              borderRadius: 100,
            }}
            onError={() => {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              setIcon(require('../../../assets/images/fallback-image.jpg'));
            }}
          />
        </View>

        <View style={{marginLeft: '5%', flex: 1}}>
          <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
            {`${
              props.nutritionist.title !== null ? props.nutritionist.title : ''
            } ${props.nutritionist.name}`}
          </Text>

          <Text variant="titleMedium" style={{color: theme.colors.muted}}>
            {props.nutritionist.isDietitian
              ? i18n.t('dietitian')
              : i18n.t('nutritionist')}
          </Text>

          {props.appointment.notes !== null && (
            <View>
              <Text variant="bodyMedium" style={{flexWrap: 'wrap'}}>
                {props.appointment.notes}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default AppointmentCard;
