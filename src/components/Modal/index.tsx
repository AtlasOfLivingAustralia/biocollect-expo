import React, { ReactNode } from 'react';
import NativeModal from 'react-native-modal';
import styled from 'styled-components/native';
import Button from './Button';

const Root = styled.View`
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.radius * 2}px;
  padding: 0px;
`;

const Title = styled.Text`
  font-family: '${({ theme }) => theme.font.header}';
  font-weight: bold;
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};
`;

const CloseButton = styled(Button)`
  border-bottom-left-radius: ${({ theme }) => theme.radius * 2}px;
  border-bottom-right-radius: ${({ theme }) => theme.radius * 2}px;
`;

interface ModalProps {
  title?: string;
  children?: ReactNode;
  visible: boolean;
  onClose: () => void;
}

const Modal = ({ title, children, visible, onClose }: ModalProps) => {
  return (
    <NativeModal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropTransitionOutTiming={0}>
      <Root>
        {title && <Title>{title}</Title>}
        {children && children}
        <CloseButton last text="CLOSE" onPress={onClose} />
      </Root>
    </NativeModal>
  );
};

export default Modal;
