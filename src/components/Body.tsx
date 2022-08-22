import { Text } from 'react-native';
import styled from 'styled-components/native';

interface BodyStyleProps {
  size?: number;
  primary?: boolean;
  bold?: boolean;
}

export default styled(Text)<BodyStyleProps>`
  font-family: '${({ theme, bold }) => (bold ? theme.font.button : theme.font.body)}';
  font-size: ${({ size }) => size || 16}px;
  color: ${({ theme, primary }) => (primary ? theme.text.primary : theme.text.secondary)};
`;
