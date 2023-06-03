import React from 'react';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {MaingGoalValues, type MainGoals} from '../../interfaces/health/Person';
import i18n from '../../localization/_i18n';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import MainGoalCard from './MainGoalCard';

export interface GoalSurveyProps
  extends SurveyComponentProps<MainGoals | undefined> {}

function GoalSurvey(props: GoalSurveyProps): JSX.Element {
  const [goal, setGoal] = React.useState<MainGoals | undefined>();

  React.useEffect(() => {
    handleMainGoalChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleMainGoalChange(props.survey.collect());
  }, [props.survey]);

  function handleMainGoalChange(mainGoals: MainGoals | undefined): void {
    props.survey.setIsDone(false);
    props.survey.update(mainGoals);
    setGoal(mainGoals);

    if (mainGoals !== undefined) {
      props.survey.setIsDone(true);
    }
  }

  function handleGoalSelect(mainGoal: MainGoals | undefined): void {
    setGoal(mainGoal);
  }

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('select-goal')}
      </Text>

      <View style={style.cardContainer}>
        {MaingGoalValues.map((cardGoal, i) => {
          return (
            <MainGoalCard
              key={i}
              goal={cardGoal}
              isSelected={cardGoal === goal}
              onSelect={handleGoalSelect}
            />
          );
        })}
      </View>
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
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    aspectRatio: 1,
  },
});

export default GoalSurvey;
