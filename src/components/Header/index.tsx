import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

type Props = {
  title: string;
  action?: ReactNode;
}

const Header: React.FC<Props> = ({
  title,
  action
}) => {
  const { secondary100, secondary40, heading } = theme.colors;

  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={() => navigation.goBack()}>
        <Icon 
          name="arrow-left" 
          size={24} 
          color={heading} />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      { action ? (
        <View>
          {action}
        </View>
      ) : 
        <View style={{ width: 24 }}/>
      }
    </LinearGradient>
  );
}

export default Header;