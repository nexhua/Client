import React from 'react';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import {Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';

export interface CurrentWeightSurveyProps
  extends SurveyComponentProps<number> {}

function CurrentWeightSurvey(props: CurrentWeightSurveyProps): JSX.Element {
  const [weight, setWeight] = React.useState(props.survey.collect());

  React.useEffect(() => {
    handleWeightChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleWeightChange(props.survey.collect());
  }, [props.survey]);

  const theme = useAppTheme();

  function handleWeightChange(weight: number): void {
    props.survey.setIsDone(false);
    props.survey.update(weight);
    setWeight(weight);

    if (weight >= 30 && weight <= 250) {
      props.survey.setIsDone(true);
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('weight-current')}
      </Text>

      <TextInput
        style={{
          ...style.input,
          borderColor: theme.colors.primary,
        }}
        mode="flat"
        label={i18n.t('weight')}
        value={weight.toString()}
        onChangeText={text => {
          const weight = parseInt(text);

          if (!isNaN(weight)) {
            handleWeightChange(weight);
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

export default CurrentWeightSurvey;
