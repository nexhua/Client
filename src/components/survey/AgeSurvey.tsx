import React from 'react';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {useAppTheme} from '../../style/Theme';

export interface AgeSurveyProps extends SurveyComponentProps<number> {}

function AgeSurvey(props: AgeSurveyProps): JSX.Element {
  const [age, setAge] = React.useState(props.survey.collect());

  React.useEffect(() => {
    handleAgeChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleAgeChange(props.survey.collect());
  }, [props.survey]);

  const theme = useAppTheme();

  function handleAgeChange(age: number): void {
    props.survey.setIsDone(false);
    props.survey.update(age);
    setAge(age);

    if (age >= 15) {
      props.survey.setIsDone(true);
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('age')}
      </Text>

      <TextInput
        style={{
          ...style.input,
          borderColor: theme.colors.primary,
        }}
        mode="flat"
        label={i18n.t('age')}
        value={age.toString()}
        onChangeText={text => {
          const num = parseInt(text);

          if (!isNaN(num)) {
            handleAgeChange(num);
          }
        }}
      />
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

export default AgeSurvey;
