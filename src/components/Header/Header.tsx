import { Text } from 'react-native';
import styled from 'styled-components/native';

interface HeaderStyleProps {
  size?: number;
}

export default styled(Text)<HeaderStyleProps>`
  font-family: '${({ theme }) => theme.font.header}';
  font-size: ${({ size }) => size || 36}px;
  color: ${({ theme }) => theme.text.primary};
`;
