import React from 'react';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import {Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';

export interface DiseaseSurveyProps extends SurveyComponentProps<string[]> {}

function DiseaseSurvey(props: DiseaseSurveyProps): JSX.Element {
  const [diseases, setDiseases] = React.useState<string[]>([]);

  React.useEffect(() => {
    handleDiseasesChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleDiseasesChange(props.survey.collect());
  }, [props.survey]);

  const theme = useAppTheme();

  function handleDiseasesChange(text: string[]): void {
    props.survey.setIsDone(false);
    props.survey.update(text);
    setDiseases(text);

    if (text.length > 0) {
      props.survey.setIsDone(true);
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('diseases')}
      </Text>

      <TextInput
        style={{
          ...style.input,
          borderColor: theme.colors.primary,
        }}
        mode="flat"
        label={i18n.t('disease')}
        value={diseases.join(', ')}
        onChangeText={text => {
          const diseases = text
            .split(',')
            .map(d => d.trim())
            .filter(d => d !== '');

          handleDiseasesChange(diseases);
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

export default DiseaseSurvey;
