import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface ProfileStyleProps {
  size: number;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

interface ProfileProps extends ProfileStyleProps, TouchableOpacityProps {
  name: string;
}

// TODO: Move font family into theme config
const Root = styled(TouchableOpacity)<ProfileStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.secondary};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

// TODO: Move font family into theme config
const RootText = styled(Text)<ProfileStyleProps>`
  color: ${({ theme }) => theme.text.primary};
  font-family: 'Lato';
  font-size: ${({ size }) => Math.max(size - 34, 14)}px;
  font-weight: bold;
`;

export default ({ size, name, ...props }: ProfileProps) => (
  <Root size={size} {...props} activeOpacity={0.6}>
    <RootText size={size}>{getInitials(name)}</RootText>
  </Root>
);
