import React from 'react';
import {type MainGoals} from '../../interfaces/health/Person';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import Icon from 'react-native-paper/src/components/Icon';
import i18n from '../../localization/_i18n';
import {Text} from 'react-native-paper';

export interface MainGoalCardProps {
  goal: MainGoals;
  isSelected: boolean;
  onSelect: (goal: MainGoals) => void;
}

function MainGoalCard(props: MainGoalCardProps): JSX.Element {
  const [isSelected, setIsSelected] = React.useState(props.isSelected);

  const theme = useAppTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsSelected(!isSelected);
        props.onSelect(props.goal);
      }}>
      <View>
        <View
          style={{
            ...style.container,
            backgroundColor: theme.colors.onSurfaceVariant,
            borderColor: theme.colors.primary,
            borderWidth: isSelected ? 4 : 0,
          }}>
          <View style={style.iconContainer}>
            {getIcons(props.goal, theme.colors.surfaceVariant)}
          </View>
        </View>

        <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
          {getTitle(props.goal)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function getIcons(goal: MainGoals, color: string): JSX.Element[] {
  const icons = [];

  switch (goal) {
    case 'lostWeight':
      icons.push(
        <Icon key={1} source={'scale-bathroom'} size={40} color={color} />,
      );
      icons.push(
        <Icon key={2} source={'arrow-down-thin'} size={40} color={color} />,
      );
      break;
    case 'gainWeight':
      icons.push(
        <Icon key={1} source={'scale-bathroom'} size={40} color={color} />,
      );
      icons.push(
        <Icon key={2} source={'arrow-up-thin'} size={40} color={color} />,
      );
      break;
    case 'buildMuscle':
      icons.push(
        <Icon key={1} source={'weight-lifter'} size={40} color={color} />,
      );
      break;
  }

  return icons;
}

function getTitle(goal: MainGoals): string {
  switch (goal) {
    case 'lostWeight':
      return i18n.t('lose-weight');
    case 'gainWeight':
      return i18n.t('gain-weight');
    case 'buildMuscle':
      return i18n.t('build-muscle');
  }
}

const style = StyleSheet.create({
  container: {
    width: '25%',
    height: '25%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainGoalCard;
