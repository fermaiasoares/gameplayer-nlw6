import React from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { Fontisto as Icon } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler';

import Background from '../../components/Background';
import Header from '../../components/Header';
import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import ListHeader from '../../components/ListHeader';
import Member from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import ButtonIcon from '../../components/ButtonIcon';

type Props = {
  title: string;
  description: string;
}

const AppointmentDetails: React.FC<Props> = ({
  title,
  description
}) => {
  const { primary } = theme.colors;

  const members = [
    {
      id: '1',
      username: 'Fernando Maia',
      avatar_url: 'https://github.com/fermaiasoares.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Fernando Maia',
      avatar_url: 'https://github.com/fermaiasoares.png',
      status: 'offline'
    }
  ]

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton>
            <Icon 
              name="share" 
              size={24}
              color={primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {title}
            Lendários
          </Text>
          <Text style={styles.subtitle}>
            {description}
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader 
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida"/>
      </View>
    </Background>
  );
}

export default AppointmentDetails;