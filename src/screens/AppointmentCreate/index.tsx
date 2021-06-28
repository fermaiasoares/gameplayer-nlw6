import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/storage';
import { useNavigation } from '@react-navigation/native';

import Background from '../../components/Background';
import CategorySelect from '../../components/CategorySelect';
import Header from '../../components/Header';
import SmallInput from '../../components/SmallInput/index';
import GuildIcon from '../../components/GuildIcon';

import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import ModalView from '../../components/ModalView';
import Guilds from '../Guilds/index';

import { GuildProps } from '../../components/Appointment/index';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
}

const AppointmentCreate: React.FC<Props> = () => {
  const navigation = useNavigation()

  const [category, setCategory] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleShowGuilds() {
    setShowModal(true);
  }

  function handleCloseGuilds() {
    setShowModal(false);
  }

  function handleGuildSelected(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setShowModal(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}`,
      description: descriptionText
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([...appointments, newAppointment]));
    navigation.navigate('Home');
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
                    ?  <GuildIcon iconId={guild.icon} guildId={guild.id} />
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
                    <SmallInput 
                      maxLength={2}
                      onChangeText={setDay}
                    />
                    <Text style={styles.divider}>/</Text>
                    <SmallInput 
                      maxLength={2}
                      onChangeText={setMonth} 
                    />
                  </View>
                </View>

                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e minuto
                  </Text>
                  <View style={styles.column}>
                    <SmallInput 
                      maxLength={2} 
                      onChangeText={setHour}
                    />
                    <Text style={styles.divider}>:</Text>
                    <SmallInput 
                      maxLength={2} 
                      onChangeText={setMinute}
                    />
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
                onChangeText={setDescriptionText}
              />
            </View>

          <View style={styles.footer}>
            <Button 
              title="Agendar"
              onPress={handleSave}
            />
          </View>
        </Background>
      </ScrollView>
      <ModalView visible={showModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelected={handleGuildSelected} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;