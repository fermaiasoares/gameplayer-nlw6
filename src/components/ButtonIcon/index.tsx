import React from 'react';
import { 
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View, 
} from 'react-native';

import { styles } from './styles';

import DiscordImg from '../../assets/discord.png';

type Props = TouchableOpacityProps & {
  title: string;
}

const ButtonIcon: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <View style={styles.iconWrapper}>
          <Image source={DiscordImg} style={styles.icon}/>
        </View>
        <Text style={styles.title}>
          {title}
        </Text>
    </TouchableOpacity>
  );
}

export default ButtonIcon;