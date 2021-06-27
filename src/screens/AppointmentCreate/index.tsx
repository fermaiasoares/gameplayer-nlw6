import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import Background from '../../components/Background';
import CategorySelect from '../../components/CategorySelect';
import Header from '../../components/Header';
import SmallInput from '../../components/SmallInput/index';
import GuildIcon from '../../components/GuildIcon';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import TextArea from '../../components/TextArea';
import Button from '../../components/ButtonIcon';
import ModalView from '../../components/ModalView';
import Guilds from '../Guilds/index';
import { GuildProps } from '../../components/Appointment/index';

type Props = {
  title: string;
  description: string;
}

const AppointmentCreate: React.FC<Props> = ({
  title,
  description
}) => {
  const [category, setCategory] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleShowGuilds() {
    setShowModal(true);
  }

  function handleGuildSelected(guildSelected: GuildProps) {
    setGuild(guildSelected);
    console.log(guildSelected);
    setShowModal(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>

      <Background>
        <Header 
          title="Agendar Partida"
          />
        <View>
          <Text style={[
            styles.label,
            {
              marginLeft: 24,
              marginTop: 36,
              marginBottom: 18
            }
          ]}>
            Categoria
          </Text>
          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
            hasCheckBox
          />
        </View>

          <View style={styles.form}>
            <RectButton onPress={handleShowGuilds}>
              <View style={styles.select}>
                { guild.icon 
                  ?  <GuildIcon />
                  : <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    { guild.name ? guild.name : 'Selecione um Servidor' }
                  </Text>
                </View>

                <Icon name="chevron-right" size={10} color={theme.colors.heading} />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.subLabel}>Max 100 caracteres</Text>
            </View>
            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />
          </View>

          <View style={styles.footer}>
            <Button title="Agendar" />
          </View>
      </Background>
      </ScrollView>
      <ModalView visible={showModal}>
        <Guilds handleGuildSelected={handleGuildSelected} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;