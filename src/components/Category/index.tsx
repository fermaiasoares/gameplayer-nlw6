import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
}

const Category: React.FC<Props> = ({ 
  title,
  icon: Icon,
  checked = false,
  ...rest
}) => {

  const {secondary50, secondary70} = theme.colors;

  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <View style={[styles.content, { opacity: checked ? 1 : .4}]}>
          <View style={checked ? styles.checked : styles.check} />
            <Icon width={48} height={48} />

          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </RectButton>
  );
}

export default Category;