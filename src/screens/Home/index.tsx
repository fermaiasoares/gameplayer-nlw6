import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListDivider from '../../components/ListDivider';
import ListHeader from '../../components/ListHeader';
import Appointment, { AppointmentProps } from '../../components/Appointment';
import Background from '../../components/Background';

import Profile from '../Profile';

import { COLLECTION_APPOINTMENTS } from '../../configs/storage';

import { styles } from './styles';
import Loading from '../../components/Loading';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]))

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect 
          categorySelected={category}
          setCategory={handleCategorySelect}
          />
        
        {
          loading ? <Loading /> :
        <>
          <ListHeader 
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment 
                data={item}
                onPress={() => handleAppointmentDetails(item)} 
              />
            )}
            ItemSeparatorComponent={() => <ListDivider/>}
            contentContainerStyle={{paddingBottom: 69}}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
        }
      </View>
    </Background>
  );
}

export default Home;