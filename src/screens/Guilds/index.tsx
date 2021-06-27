import React from 'react';
import { FlatList, View } from 'react-native';
import Guild from '../../components/Guild';
import ListDivider from '../../components/ListDivider';

import { GuildProps } from '../../components/Appointment/index';

import { styles } from './styles';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void
}

const Guilds: React.FC<Props> = ({ handleGuildSelected }) => {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'null',
      owner: true
    },
    {
      id: '2',
      name: 'Legionários',
      icon: 'null',
      owner: false
    },
    {
      id: '3',
      name: 'Rocketseat',
      icon: 'null',
      owner: false
    },
    {
      id: '4',
      name: 'Rocketseat',
      icon: 'null',
      owner: false
    },
    {
      id: '5',
      name: 'Rocketseat',
      icon: 'null',
      owner: false
    },
    {
      id: '6',
      name: 'Rocketseat',
      icon: 'null',
      owner: false
    },
    {
      id: '7',
      name: 'Rocketseat',
      icon: 'null',
      owner: false
    },
  ]

  return (
    <View style={styles.container}>
      <FlatList 
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Guild 
            data={item}
            onPress={() => handleGuildSelected(item)}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, paddingTop: 104 }}
        style={styles.guilds}
      />
    </View>
  )
}

export default Guilds;