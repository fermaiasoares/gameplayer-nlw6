import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { GuildProps } from '../../components/Appointment/index';
import Guild from '../../components/Guild';
import ListDivider from '../../components/ListDivider';
import Loading from '../../components/Loading';
import { api } from '../../services/api';

import { styles } from './styles';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void
}

const Guilds: React.FC<Props> = ({ handleGuildSelected }) => {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuilds();
  }, [])

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {
        loading ? <Loading /> : 
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
      }
    </View>
  )
}

export default Guilds;