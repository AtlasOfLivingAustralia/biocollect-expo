import { FontAwesome5 } from '@expo/vector-icons';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface RootProps extends TouchableOpacityProps {
  padding?: number;
}

const Root = styled(TouchableOpacity)<RootProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${({ padding }) => padding || 12}px;
  padding-bottom: ${({ padding }) => padding || 12}px;
`;

const RootText = styled(Text)`
  font-family: ${({ theme }) => theme.font.button};
  color: ${({ theme }) => theme.text.secondary};
  margin-left: 10px;
`;

interface NavButtonProps extends RootProps {
  icon: string;
  text: string;
}

const NavButton = ({ icon, text, ...rest }: NavButtonProps) => {
  const theme = useTheme();
  return (
    <Root {...rest} activeOpacity={0.6}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <FontAwesome5 name={icon as any} color={theme.text.secondary} />
      <RootText>{text}</RootText>
    </Root>
  );
};

export default NavButton;
