import { Platform } from 'react-native';
import styled from 'styled-components/native';

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-top: ${Platform.OS === 'android' ? 72 : 24}px;
`;

export default HeaderView;
