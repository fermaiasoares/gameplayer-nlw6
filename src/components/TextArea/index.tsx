import React from 'react';
import { TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './styles';

const TextArea: React.FC<TextInputProps> = ({...rest}) => {
  return (
    <TextInput 
      style={styles.container}
      {...rest}
    />
  )
}

export default TextArea;