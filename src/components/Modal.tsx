import React, { useState } from 'react';
import { Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Button from './Button';

interface ModalProps {
  title?: string;
  visible: boolean;
  onClose: () => void;
}

const Root = styled.View`
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius * 2}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text.primary};
`;

export default ({ title, visible, onClose }: ModalProps) => {
  // return (
  //   <NativeModal
  //     animationType='slide'
  //     transparent={true}
  //     visible={visible}
  //     onRequestClose={onClose}
  //   >
  //     <View style={styles.centeredView}>
  //       <View style={styles.modalView}>
  //         <Text style={styles.modalText}>Hello World!</Text>
  //         <Pressable
  //           style={[styles.button, styles.buttonClose]}
  //           onPress={onClose}
  //         >
  //           <Text style={styles.textStyle}>Hide Modal</Text>
  //         </Pressable>
  //       </View>
  //     </View>
  //   </NativeModal>
  // );
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <Root>
        <Title>{title || 'Modal'}</Title>
        <Button text='Close' onPress={onClose} />
      </Root>
    </Modal>
  );
};
