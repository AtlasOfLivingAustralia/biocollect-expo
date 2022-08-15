import styled from 'styled-components/native';

export default styled.TextInput`
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  border-radius: 12px;
  min-width: 125px;
`;
