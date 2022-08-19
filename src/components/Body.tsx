import { Text } from 'react-native';
import styled from 'styled-components/native';

interface HeaderStyleProps {
  size?: number;
  primary?: boolean;
}

export default styled(Text)<HeaderStyleProps>`
  font-family: '${({ theme }) => theme.font.body}';
  font-size: ${({ size }) => size || 16}px;
  color: ${({ theme, primary }) =>
    primary ? theme.text.primary : theme.text.secondary};
`;
