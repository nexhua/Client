import React from 'react';
import {type SurveyComponentProps} from '../../interfaces/survey/Survey';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {useAppTheme} from '../../style/Theme';

export interface HeightSurveyProps extends SurveyComponentProps<number> {}

function HeightSurvey(props: HeightSurveyProps): JSX.Element {
  const [height, setHeight] = React.useState(props.survey.collect());

  React.useEffect(() => {
    handleHeightChange(props.survey.collect());
  }, []);

  React.useEffect(() => {
    handleHeightChange(props.survey.collect());
  }, [props.survey]);

  function handleHeightChange(height: number): void {
    props.survey.setIsDone(false);
    props.survey.update(height);
    setHeight(height);

    if (height >= 50 && height <= 250) {
      props.survey.setIsDone(true);
    }
  }

  const theme = useAppTheme();

  return (
    <View style={style.container}>
      <Text style={style.title} variant="titleLarge">
        {i18n.t('height-cm')}
      </Text>

      <TextInput
        style={{
          ...style.input,
          borderColor: theme.colors.primary,
        }}
        mode="flat"
        label={i18n.t('height')}
        value={height.toString()}
        onChangeText={text => {
          const height = parseInt(text);

          if (!isNaN(height)) {
            handleHeightChange(height);
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

export default HeightSurvey;
