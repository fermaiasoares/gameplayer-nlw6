import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, Text, View, Share, Platform } from 'react-native';
import { Fontisto as Icon } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import Background from '../../components/Background';
import Header from '../../components/Header';
import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import ListHeader from '../../components/ListHeader';
import Member from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import ButtonIcon from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import {MemberProps} from '../../components/Member/index';
import Loading from '../../components/Loading';

type Props = {
  title: string;
  description: string;
}

type ParamsRoute = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

const AppointmentDetails: React.FC<Props> = () => {
  const route = useRoute()
  const { guildSelected } = route.params as ParamsRoute;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const { primary } = theme.colors;

  function handleOpenGuildServer() {
    const url = `https://discord.com/channels/${widget.id}`;
    Linking.openURL(url);
  }

  useEffect(() => {
    fetchGuildWidget();
  })

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch {
      Alert.alert('Ops! Verifique as configurações do servidor. Talvez o widget esteja desabilitado.')
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvite() {
    const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvite}>
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
            {guildSelected.guild.name}
          </Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        loading ? <Loading /> : 
        <>
          <ListHeader 
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList 
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      }

      
      <View style={styles.footer}>
        <ButtonIcon
          onPress={handleOpenGuildServer} 
          title="Entrar na partida"
        />
      </View>
    </Background>
  );
}

export default AppointmentDetails;