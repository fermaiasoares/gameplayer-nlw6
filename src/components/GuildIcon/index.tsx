import React from 'react';
import { Image, View } from 'react-native';

const { CDN_IMAGE } = process.env;

import DiscordSvg from '../../assets/discord.svg';

import { styles } from './styles';

type Props = {
  guildId: string;
  iconId: string;
}

const GuildIcon: React.FC<Props> = ({ guildId, iconId}) => {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  return (
    <View style={styles.container}>
      {
        iconId ? <Image 
          source={{ uri }}
          style={styles.image}
        />
        : <DiscordSvg width={40} heigth={40} />
      }
    </View>
  );
}

export default GuildIcon;