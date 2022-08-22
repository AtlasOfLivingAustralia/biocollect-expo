import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const Root = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const RootText = styled(Text)`
  font-family: ${({ theme }) => theme.font.button};
  color: ${({ theme }) => theme.text.secondary};
  margin-left: 10px;
`;

interface NavButtonProps extends TouchableOpacityProps {
  icon: string;
  text: string;
}

const NavButton = ({ icon, text, ...rest }: NavButtonProps) => {
  const theme = useTheme();
  return (
    <Root {...rest} activeOpacity={0.6}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <FontAwesome name={icon as any} color={theme.text.secondary} />
      <RootText>{text}</RootText>
    </Root>
  );
};

export default NavButton;
