import styled from 'styled-components/native';

export default styled.Text`
  color: white;
  font-family: 'Lato';
  font-size: 24px;
  color: ${({ theme }) => theme.text.secondary};
`;
