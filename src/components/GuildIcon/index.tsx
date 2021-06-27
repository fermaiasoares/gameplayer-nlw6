import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';

type Props = {

}

const GuildIcon: React.FC<Props> = ({}) => {
  return (
    <Image 
      source={{ uri: 'https://play-lh.googleusercontent.com/Wq15hCMPJW-eUz-c4DtnUxHkk2s-pVra14td-E4b05Eo-Cu8Koj6BqPUNULbh9HfjpkC=s180-rw' }}
      style={styles.image}
    />
  );
}

export default GuildIcon;