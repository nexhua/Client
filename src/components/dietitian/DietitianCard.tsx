import React from 'react';
import {type Nutritionist} from '../../interfaces/dietitian/Dietitian';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import {IconButton, Text} from 'react-native-paper';

interface DietitianCardProps {
  dietitian: Nutritionist;
  onPress: (dietitian: Nutritionist) => void;
}

function DietitianCard(props: DietitianCardProps): JSX.Element {
  const [icon, setIcon] = React.useState(
    props.dietitian.photoUrl !== null
      ? {uri: props.dietitian.photoUrl}
      : require('../../../assets/images/fallback-image.jpg'),
  );

  const theme = useAppTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress(props.dietitian);
      }}>
      <View
        style={{
          ...style.card,
          backgroundColor: theme.colors.surfaceVariant,
        }}>
        <Image
          source={icon}
          style={{
            width: '40%',
            aspectRatio: 1,
            borderRadius: 100,
            marginRight: '5%',
          }}
          onError={() => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            setIcon(require('../../../assets/images/fallback-image.jpg'));
          }}
        />
        <View style={{justifyContent: 'space-between'}}>
          <View>
            <Text variant="titleLarge">
              {`${
                props.dietitian.title !== null ? props.dietitian.title : ''
              } ${props.dietitian.name}`}
            </Text>
            <Text variant="labelMedium" style={{marginTop: '3%'}}>
              {props.dietitian.address}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity>
              <IconButton
                icon="chat"
                iconColor={theme.colors.primary}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconButton
                icon="phone"
                iconColor={theme.colors.primary}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  card: {
    borderRadius: 25,
    marginTop: '5%',
    flexDirection: 'row',
    padding: '5%',
  },
});

export default DietitianCard;
