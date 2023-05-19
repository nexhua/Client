import React from 'react';
import {type Nutritionist} from '../../interfaces/dietitian/Dietitian';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppTheme} from '../../style/Theme';
import {IconButton, Text} from 'react-native-paper';

interface DietitianCardProps {
  dietitian: Nutritionist;
}

function DietitianCard(props: DietitianCardProps): JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      style={{
        ...style.card,
        backgroundColor: theme.colors.surfaceVariant,
      }}>
      <Image
        source={{uri: props.dietitian.photoUrl}}
        style={{
          width: '40%',
          aspectRatio: 1,
          borderRadius: 100,
          marginRight: '5%',
        }}
      />
      <View style={{justifyContent: 'space-between'}}>
        <View>
          <Text variant="titleLarge">
            {`${props.dietitian.title !== null ? props.dietitian.title : ''} ${
              props.dietitian.name
            }`}
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
