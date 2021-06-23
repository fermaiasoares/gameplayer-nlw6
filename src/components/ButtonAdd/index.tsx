import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

const ButtonAdd: React.FC<RectButtonProps> = ({ ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <Icon name="plus" size={24} color={theme.colors.heading} />
    </RectButton>
  )
}

export default ButtonAdd;