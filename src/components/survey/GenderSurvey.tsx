import React from 'react';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {Picker} from '@react-native-picker/picker';

export interface GenderSurveyProps extends SurveyComponentProps<'m' | 'f'> {}

function GenderSurvey(props: GenderSurveyProps): JSX.Element {
  const [gender, setGender] = React.useState<'m' | 'f'>(props.survey.collect());

  React.useEffect(() => {
    handleGenderChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleGenderChange(props.survey.collect());
  }, [props.survey]);

  function handleGenderChange(gender: 'm' | 'f'): void {
    props.survey.setIsDone(true);
    props.survey.update(gender);
    setGender(gender);
  }

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('gender')}
      </Text>

      <Picker
        selectedValue={gender}
        onValueChange={(value: 'm' | 'f') => {
          handleGenderChange(value);
        }}>
        <Picker.Item label="Male" value={'m'}></Picker.Item>
        <Picker.Item label="Female" value={'f'}></Picker.Item>
      </Picker>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  title: {
    marginBottom: '2%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    marginVertical: '1%',
  },
});

export default GenderSurvey;
