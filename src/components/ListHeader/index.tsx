import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

type Props = {
  title: string;
  subtitle?: string;
}

const ListHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {
        subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )
      }
    </View>
  );
}

export default ListHeader