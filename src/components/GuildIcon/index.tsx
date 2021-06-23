import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';

type Props = {

}

const GuildIcon: React.FC<Props> = ({}) => {
  return (
    <Image 
      source={{ uri: 'https://toppng.com/uploads/preview/discord-logo-01-discord-logo-11562849833clsolz2mbc.png' }}
      style={styles.image}
    />
  );
}

export default GuildIcon;