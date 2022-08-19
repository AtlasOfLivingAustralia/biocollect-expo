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

export default (props: TouchableOpacityProps) => {
  const theme = useTheme();
  return (
    <Root {...props} activeOpacity={0.6}>
      <FontAwesome name='arrow-left' color={theme.text.secondary} />
      <RootText>GO BACK</RootText>
    </Root>
  );
};
