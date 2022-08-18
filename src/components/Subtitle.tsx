import styled from 'styled-components/native';

export default styled.Text`
  font-family: '${({ theme }) => theme.font.header}';
  font-size: 24px;
  color: ${({ theme }) => theme.text.secondary};
`;
