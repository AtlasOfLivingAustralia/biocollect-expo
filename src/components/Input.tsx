import { TextInput, TextInputProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const Input = styled(TextInput)`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 16px;
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius}px;
  min-width: 125px;
  shadow-opacity: 0.25;
  shadow-radius: 2px;
  shadow-color: black;
  shadow-offset: 0px 2.8px;
  elevation: 4;
`;

export default function StyledTextInput(props: TextInputProps) {
  const theme = useTheme();
  return <Input {...props} placeholderTextColor={theme.text.secondary} />;
}
