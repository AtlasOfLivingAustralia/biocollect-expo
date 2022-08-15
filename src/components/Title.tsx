import styled from 'styled-components/native';

export default styled.Text`
  color: white;
  font-family: 'Lato';
  font-size: 36px;
  color: ${({ theme }) => theme.text.primary};
`;
