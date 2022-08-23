import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export default styled(TextInput)`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 16px;
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  padding: 12px;
  border-radius: 12px;
  min-width: 125px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  shadow-color: black;
  shadow-offset: 0px 2.8px;
  elevation: 6;
`;
