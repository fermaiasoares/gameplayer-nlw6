import React, { ReactNode } from 'react';
import { Modal, ModalProps, View, TouchableWithoutFeedback } from 'react-native';
import Background from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
}

const ModalView: React.FC<Props> = ({ children, closeModal, ...rest }) => {
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              { children }
            </Background>
          </View>
        </View>
        </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalView;