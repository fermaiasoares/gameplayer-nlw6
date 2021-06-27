import React from 'react';
import { TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './styles';

const SmallInput: React.FC<TextInputProps> = ({...rest}) => {
  return (
    <TextInput 
      style={styles.container}
      keyboardType="numeric"
      {...rest}
    />
  )
}

export default SmallInput;