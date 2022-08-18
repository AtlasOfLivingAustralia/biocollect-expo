import { Text } from 'react-native';
import styled from 'styled-components/native';

interface SubheaderStyleProps {
  size?: number;
}

export default styled(Text)<SubheaderStyleProps>`
  font-family: '${({ theme }) => theme.font.header}';
  font-size: ${({ size }) => size || 24}px;
  color: ${({ theme }) => theme.text.secondary};
`;
