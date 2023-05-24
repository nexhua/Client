import React from 'react';
import {type User} from '../../interfaces/identity/User';
import {View, type ViewStyle} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {useAppTheme} from '../../style/Theme';
import {Picker} from '@react-native-picker/picker';
import {getMonth, range} from '../../util/Time';

interface AccountSettingsProps {
  user: User;
  containerStyle: ViewStyle;
  titleStyle: ViewStyle;
  inputStyle: ViewStyle;
  buttonStyle: ViewStyle;
  onSave: (
    name: string,
    cellNo: string,
    day: number,
    year: number,
    month: string,
  ) => void;
}

function AccountSettings(props: AccountSettingsProps): JSX.Element {
  const [name, setName] = React.useState(
    props.user.name !== null ? props.user.name : '',
  );
  const [cellNo, setCellNo] = React.useState(
    props.user.phoneNumber !== null ? props.user.phoneNumber : '',
  );

  const [selectedMonth, setSelectedMonth] = React.useState('january');
  const [day, setDay] = React.useState(-1);
  const [year, setYear] = React.useState(-1);

  const theme = useAppTheme();

  return (
    <>
      <View style={props.containerStyle}>
        <Text style={props.titleStyle} variant="titleLarge">
          {i18n.t('my-account')}
        </Text>
        <TextInput
          style={{...props.inputStyle, borderColor: theme.colors.primary}}
          mode="flat"
          label={i18n.t('name')}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          placeholder={i18n.t('name-placeholder')}
        />
        <TextInput
          style={{...props.inputStyle, borderColor: theme.colors.primary}}
          mode="flat"
          label={i18n.t('cell-no')}
          value={cellNo}
          onChangeText={text => {
            setCellNo(text);
          }}
          placeholder={i18n.t('cell-no-placeholder')}
        />

        <View style={{flexDirection: 'row', gap: 10}}>
          <TextInput
            style={{
              ...props.inputStyle,
              borderColor: theme.colors.primary,
              flexGrow: 1,
            }}
            mode="flat"
            label={i18n.t('day')}
            value={day === -1 ? '' : day.toString()}
            onChangeText={text => {
              const parsedInt = parseInt(text);

              if (!isNaN(parsedInt)) {
                setDay(parsedInt);
              }
            }}
          />

          <TextInput
            style={{
              ...props.inputStyle,
              borderColor: theme.colors.primary,
              flexGrow: 1,
            }}
            mode="flat"
            label={i18n.t('year')}
            value={year === -1 ? '' : year.toString()}
            onChangeText={text => {
              const parsedInt = parseInt(text);
              if (!isNaN(parsedInt)) {
                setYear(parsedInt);
              }
            }}
          />
        </View>

        <Picker
          selectedValue={selectedMonth}
          onValueChange={val => {
            setSelectedMonth(val);
          }}>
          {range(0, 12)
            .map(num => getMonth(num))
            .map((month, i) => {
              return (
                <Picker.Item key={i} label={i18n.t(month)} value={month} />
              );
            })}
        </Picker>

        <Button
          style={props.buttonStyle}
          mode="contained"
          onPress={() => {
            props.onSave(name, cellNo, day, year, selectedMonth);
          }}>
          {i18n.t('save').toUpperCase()}
        </Button>
      </View>
    </>
  );
}

export default AccountSettings;
