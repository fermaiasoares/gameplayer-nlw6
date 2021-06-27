import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import Appointment from '../../components/Appointment';

import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListDivider from '../../components/ListDivider';
import ListHeader from '../../components/ListHeader';

import Profile from '../Profile';

import Background from '../../components/Background';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const navigation = useNavigation();

  const appointments = [
    { 
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
    { 
      id: '2',
      guild: {
        id: '2',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

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

        <View style={styles.content}>
          <ListHeader 
            title="Partidas agendadas"
            subtitle="Total 6"
          />

          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment 
                data={item}
                onPress={handleAppointmentDetails} 
              />
            )}
            ItemSeparatorComponent={() => <ListDivider/>}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            />
        </View>
      </View>
    </Background>
  );
}

export default Home;