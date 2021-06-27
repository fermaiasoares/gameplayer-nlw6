import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { GuildProps } from '../Appointment/index';
import GuildIcon from '../GuildIcon';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  data: GuildProps,
}

const Guild: React.FC<Props> = ({data, ...rest}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <GuildIcon />

      <View style={styles.content}>
        <>
          <Text style={styles.title}>
            {data.name}
          </Text>

          <Text style={styles.type}>
            { data.owner ? 'Administrador' : 'Convidado'}
          </Text>
        </>
        
      </View>
      <Icon name="chevron-right" size={24} color={theme.colors.heading} />
    </TouchableOpacity>
  )
}

export default Guild;