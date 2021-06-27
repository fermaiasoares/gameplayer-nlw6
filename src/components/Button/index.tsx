import React from 'react';
import { 
  Text,
} from 'react-native';

import { styles } from './styles';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type Props = RectButtonProps & {
  title: string;
}

const Button: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
        <Text style={styles.title}>
          {title}
        </Text>
    </RectButton>
  );
}

export default Button;