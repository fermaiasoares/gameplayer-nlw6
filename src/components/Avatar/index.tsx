import React from 'react';
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  urlImage: string;
}

const Avatar: React.FC<Props> = ({urlImage}) => {
  const {secondary50, secondary60} = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary60]}
    >
      <Image source={{ uri: urlImage }} style={styles.avatar}/>
    </LinearGradient>
  )
}

export default Avatar;