import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {useAppTheme} from '../../style/Theme';

export interface WeightSurveyProps extends SurveyComponentProps<number> {}

function WeightSurvey(props: WeightSurveyProps): JSX.Element {
  const [weightGoal, setWeightGoal] = React.useState(props.survey.collect());

  React.useEffect(() => {
    handleGoalChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleGoalChange(props.survey.collect());
  }, [props.survey]);

  const theme = useAppTheme();

  function handleGoalChange(weight: number): void {
    props.survey.setIsDone(false);
    props.survey.update(weight);
    setWeightGoal(weight);

    if (weight >= 30) {
      props.survey.setIsDone(true);
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('weight-goal')}
      </Text>

      <TextInput
        style={{
          ...style.input,
          borderColor: theme.colors.primary,
        }}
        mode="flat"
        label={i18n.t('weight')}
        value={weightGoal.toString()}
        onChangeText={text => {
          const weight = parseInt(text);

          if (!isNaN(weight)) {
            handleGoalChange(weight);
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

export default WeightSurvey;
