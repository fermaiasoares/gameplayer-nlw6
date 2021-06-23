import React from 'react';
import { Text, View } from 'react-native';
import Avatar from '../../components/Avatar';
import { styles } from './styles';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Avatar urlImage="https://github.com/fermaiasoares.png" />
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          <Text style={styles.username}>
            Fernando Maia
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de vitória.
        </Text>
      </View>
    </View>
  );
}

export default Profile;