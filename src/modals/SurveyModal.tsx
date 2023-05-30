import React from 'react';
import {Appbar, Modal} from 'react-native-paper';
import {useAppTheme} from '../style/Theme';
import i18n from '../localization/_i18n';
import {View} from 'react-native';
import Timeline from '../components/survey/Timeline';
import Survey, {SurveyComponent} from '../interfaces/survey/Survey';
import WeightSurvey from '../components/survey/WeightSurvey';
import GenderSurvey from '../components/survey/GenderSurvey';
import AgeSurvey from '../components/survey/AgeSurvey';
import HeightSurvey from '../components/survey/HeightSurvey';
import CurrentWeightSurvey from '../components/survey/CurrentWeightSurvey';
import DiseaseSurvey from '../components/survey/DiseaseSurvey';
import {type MainGoals} from '../interfaces/health/Person';
import GoalSurvey from '../components/survey/GoalSurvey';

export interface SurveyModalProps {
  visible: boolean;
  onDismiss: () => void;
}

// const questions: Array<Survey<any>> = [new Survey(0, '1'), new Survey(0, '2')];

const weightSurvey = new Survey<number>(0, '1');
const curWeightSurvey = new Survey(0, '2');
const genderSurvey = new Survey<'m' | 'f'>('m', '3');
const ageSurvey = new Survey<number>(0, '4');
const heightSurvey = new Survey<number>(0, '5');
const diseaseSurvey = new Survey<string[]>([], '6');
const goalSurvey = new Survey<MainGoals | undefined>(undefined, '7');

const surveys: Array<SurveyComponent<any>> = [
  new SurveyComponent(weightSurvey, <WeightSurvey survey={weightSurvey} />),
  new SurveyComponent(
    curWeightSurvey,
    <CurrentWeightSurvey survey={curWeightSurvey} />,
  ),
  new SurveyComponent(genderSurvey, <GenderSurvey survey={genderSurvey} />),
  new SurveyComponent(ageSurvey, <AgeSurvey survey={ageSurvey} />),
  new SurveyComponent(heightSurvey, <HeightSurvey survey={heightSurvey} />),
  new SurveyComponent(diseaseSurvey, <DiseaseSurvey survey={diseaseSurvey} />),
  new SurveyComponent(goalSurvey, <GoalSurvey survey={goalSurvey} />),
];

function SurveyModal(props: SurveyModalProps): JSX.Element {
  const [active, setActive] = React.useState('1');
  const [component, setComponent] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    activateSurvey('1');
  }, []);

  const theme = useAppTheme();

  function onSurveySelect(label: string): void {
    activateSurvey(label);
  }

  function activateSurvey(label: string): void {
    const surveyComponent = surveys.find(
      s => s.getSurvey().getLabel() === label,
    );

    if (surveyComponent !== undefined) {
      setActive(label);
      setComponent(surveyComponent.getComponent());
    }
  }

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.surfaceVariant,
      }}
      dismissable={false}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onDismiss();
          }}
        />
        <Appbar.Content title={i18n.t('survey')} />
      </Appbar.Header>

      <View style={{margin: '5%'}}>
        <Timeline
          labels={surveys.map((s, i) => (i + 1).toString())}
          activeLabel={active}
          onPress={onSurveySelect}
        />
      </View>

      <View style={{margin: '5%'}}>{component}</View>
    </Modal>
  );
}

export default SurveyModal;
